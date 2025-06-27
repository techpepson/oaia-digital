
-- Drop existing objects if they exist to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create enum types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('contractor', 'agency', 'ministry', 'auditor', 'oaia_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE business_type AS ENUM ('sole_proprietorship', 'partnership', 'limited_company', 'cooperative');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('draft', 'submitted', 'pending', 'processing', 'approved', 'rejected', 'paid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE audit_status AS ENUM ('open', 'in_progress', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('invoice_submitted', 'invoice_approved', 'invoice_rejected', 'payment_processed', 'document_required', 'system_update');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE document_type AS ENUM ('certificate_incorporation', 'memorandum_articles', 'shareholding_structure', 'company_profile', 'directors_id', 'company_address_proof', 'regulatory_license', 'financial_statements');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  phone_number TEXT,
  user_role user_role NOT NULL,
  business_type business_type,
  primary_region TEXT,
  primary_agency TEXT,
  is_onboarded BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bank_details table
CREATE TABLE IF NOT EXISTS bank_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT,
  branch_code TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES profiles(id),
  invoice_number TEXT NOT NULL UNIQUE,
  contract_reference TEXT,
  service_description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  work_period TEXT,
  completion_date DATE,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  payment_terms TEXT NOT NULL,
  advance_percentage INTEGER DEFAULT 0,
  advance_amount DECIMAL(15,2) DEFAULT 0,
  status invoice_status DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create compliance_documents table
CREATE TABLE IF NOT EXISTS compliance_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  is_verified BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  contractor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES profiles(id),
  amount DECIMAL(15,2) NOT NULL,
  payment_type TEXT NOT NULL,
  status payment_status DEFAULT 'pending',
  payment_reference TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_records table
CREATE TABLE IF NOT EXISTS audit_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  auditor_id UUID REFERENCES profiles(id),
  status audit_status DEFAULT 'open',
  findings TEXT,
  recommendations TEXT,
  risk_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL,
  is_read BOOLEAN DEFAULT false,
  related_invoice_id UUID REFERENCES invoices(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default system settings if they don't exist
INSERT INTO system_settings (key, value, description) 
SELECT 'advance_rates', '{"30_days": 15, "60_days": 20, "90_days": 25, "120_days": 30}'::jsonb, 'Discount rates for advance payments'
WHERE NOT EXISTS (SELECT 1 FROM system_settings WHERE key = 'advance_rates');

INSERT INTO system_settings (key, value, description) 
SELECT 'onboarding_requirements', '["certificate_incorporation", "memorandum_articles", "shareholding_structure", "company_profile", "directors_id", "company_address_proof", "regulatory_license", "financial_statements"]'::jsonb, 'Required documents for onboarding'
WHERE NOT EXISTS (SELECT 1 FROM system_settings WHERE key = 'onboarding_requirements');

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can manage their own bank details" ON bank_details;
DROP POLICY IF EXISTS "Contractors can manage their own invoices" ON invoices;
DROP POLICY IF EXISTS "Agencies can view assigned invoices" ON invoices;
DROP POLICY IF EXISTS "Agencies can update assigned invoices" ON invoices;
DROP POLICY IF EXISTS "Users can manage their own documents" ON compliance_documents;
DROP POLICY IF EXISTS "Contractors can view their payments" ON payments;
DROP POLICY IF EXISTS "Agencies can manage payments" ON payments;
DROP POLICY IF EXISTS "Auditors can manage audit records" ON audit_records;
DROP POLICY IF EXISTS "Others can view audit records" ON audit_records;
DROP POLICY IF EXISTS "Users can manage their own notifications" ON notifications;
DROP POLICY IF EXISTS "Everyone can read system settings" ON system_settings;
DROP POLICY IF EXISTS "Only admins can modify system settings" ON system_settings;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role = 'oaia_admin')
);

-- Create RLS policies for bank_details
CREATE POLICY "Users can manage their own bank details" ON bank_details FOR ALL USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role = 'oaia_admin')
);

-- Create RLS policies for invoices
CREATE POLICY "Contractors can manage their own invoices" ON invoices FOR ALL USING (contractor_id = auth.uid());
CREATE POLICY "Agencies can view assigned invoices" ON invoices FOR SELECT USING (
  agency_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('agency', 'ministry', 'auditor', 'oaia_admin'))
);
CREATE POLICY "Agencies can update assigned invoices" ON invoices FOR UPDATE USING (
  agency_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('agency', 'ministry', 'oaia_admin'))
);

-- Create RLS policies for compliance_documents
CREATE POLICY "Users can manage their own documents" ON compliance_documents FOR ALL USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('agency', 'ministry', 'auditor', 'oaia_admin'))
);

-- Create RLS policies for payments
CREATE POLICY "Contractors can view their payments" ON payments FOR SELECT USING (contractor_id = auth.uid());
CREATE POLICY "Agencies can manage payments" ON payments FOR ALL USING (
  agency_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('agency', 'ministry', 'oaia_admin'))
);

-- Create RLS policies for audit_records
CREATE POLICY "Auditors can manage audit records" ON audit_records FOR ALL USING (
  auditor_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('auditor', 'oaia_admin'))
);
CREATE POLICY "Others can view audit records" ON audit_records FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('contractor', 'agency', 'ministry'))
);

-- Create RLS policies for notifications
CREATE POLICY "Users can manage their own notifications" ON notifications FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for system_settings
CREATE POLICY "Everyone can read system settings" ON system_settings FOR SELECT USING (true);
CREATE POLICY "Only admins can modify system settings" ON system_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role = 'oaia_admin')
);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, organization_name, phone_number, user_role, business_type, primary_region, primary_agency)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'organization_name', 'New Organization'),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', NULL),
    COALESCE((NEW.raw_user_meta_data->>'user_role')::user_role, 'contractor'),
    CASE 
      WHEN NEW.raw_user_meta_data->>'business_type' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'business_type')::business_type 
      ELSE NULL 
    END,
    COALESCE(NEW.raw_user_meta_data->>'primary_region', NULL),
    COALESCE(NEW.raw_user_meta_data->>'primary_agency', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_bank_details_updated_at ON bank_details;
DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
DROP TRIGGER IF EXISTS update_audit_records_updated_at ON audit_records;
DROP TRIGGER IF EXISTS update_system_settings_updated_at ON system_settings;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bank_details_updated_at BEFORE UPDATE ON bank_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_audit_records_updated_at BEFORE UPDATE ON audit_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
