
-- Create storage bucket for compliance documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('compliance-documents', 'compliance-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload their own documents" ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'compliance-documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents" ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'compliance-documents' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR 
   EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_role IN ('agency', 'ministry', 'auditor', 'oaia_admin')))
);

CREATE POLICY "Users can update their own documents" ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'compliance-documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents" ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'compliance-documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
