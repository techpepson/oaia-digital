export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_records: {
        Row: {
          auditor_id: string | null
          created_at: string | null
          findings: string | null
          id: string
          invoice_id: string | null
          recommendations: string | null
          risk_level: string | null
          status: Database["public"]["Enums"]["audit_status"] | null
          updated_at: string | null
        }
        Insert: {
          auditor_id?: string | null
          created_at?: string | null
          findings?: string | null
          id?: string
          invoice_id?: string | null
          recommendations?: string | null
          risk_level?: string | null
          status?: Database["public"]["Enums"]["audit_status"] | null
          updated_at?: string | null
        }
        Update: {
          auditor_id?: string | null
          created_at?: string | null
          findings?: string | null
          id?: string
          invoice_id?: string | null
          recommendations?: string | null
          risk_level?: string | null
          status?: Database["public"]["Enums"]["audit_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_records_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_records_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_details: {
        Row: {
          account_name: string | null
          account_number: string
          bank_name: string
          branch_code: string
          branch_name: string
          created_at: string | null
          id: string
          is_verified: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_name?: string | null
          account_number: string
          bank_name: string
          branch_code: string
          branch_name: string
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_name?: string | null
          account_number?: string
          bank_name?: string
          branch_code?: string
          branch_name?: string
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_documents: {
        Row: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          invoice_id: string | null
          is_verified: boolean | null
          mime_type: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          invoice_id?: string | null
          is_verified?: boolean | null
          mime_type?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          invoice_id?: string | null
          is_verified?: boolean | null
          mime_type?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_documents_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          advance_amount: number | null
          advance_percentage: number | null
          agency_id: string | null
          amount: number
          approved_at: string | null
          completion_date: string | null
          contract_reference: string | null
          contractor_id: string | null
          created_at: string | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          payment_terms: string
          rejected_at: string | null
          rejection_reason: string | null
          service_description: string
          status: Database["public"]["Enums"]["invoice_status"] | null
          submitted_at: string | null
          updated_at: string | null
          work_period: string | null
        }
        Insert: {
          advance_amount?: number | null
          advance_percentage?: number | null
          agency_id?: string | null
          amount: number
          approved_at?: string | null
          completion_date?: string | null
          contract_reference?: string | null
          contractor_id?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          invoice_date: string
          invoice_number: string
          payment_terms: string
          rejected_at?: string | null
          rejection_reason?: string | null
          service_description: string
          status?: Database["public"]["Enums"]["invoice_status"] | null
          submitted_at?: string | null
          updated_at?: string | null
          work_period?: string | null
        }
        Update: {
          advance_amount?: number | null
          advance_percentage?: number | null
          agency_id?: string | null
          amount?: number
          approved_at?: string | null
          completion_date?: string | null
          contract_reference?: string | null
          contractor_id?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          payment_terms?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          service_description?: string
          status?: Database["public"]["Enums"]["invoice_status"] | null
          submitted_at?: string | null
          updated_at?: string | null
          work_period?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_invoice_id: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_invoice_id?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_invoice_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_invoice_id_fkey"
            columns: ["related_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          agency_id: string | null
          amount: number
          contractor_id: string | null
          created_at: string | null
          id: string
          invoice_id: string | null
          payment_reference: string | null
          payment_type: string
          processed_at: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string | null
        }
        Insert: {
          agency_id?: string | null
          amount: number
          contractor_id?: string | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          payment_reference?: string | null
          payment_type: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: string | null
          amount?: number
          contractor_id?: string | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          payment_reference?: string | null
          payment_type?: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          business_type: Database["public"]["Enums"]["business_type"] | null
          created_at: string | null
          email: string
          id: string
          is_onboarded: boolean | null
          is_verified: boolean | null
          organization_name: string
          phone_number: string | null
          primary_agency: string | null
          primary_region: string | null
          updated_at: string | null
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string | null
          email: string
          id: string
          is_onboarded?: boolean | null
          is_verified?: boolean | null
          organization_name: string
          phone_number?: string | null
          primary_agency?: string | null
          primary_region?: string | null
          updated_at?: string | null
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string | null
          email?: string
          id?: string
          is_onboarded?: boolean | null
          is_verified?: boolean | null
          organization_name?: string
          phone_number?: string | null
          primary_agency?: string | null
          primary_region?: string | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      audit_status: "open" | "in_progress" | "closed"
      business_type:
        | "sole_proprietorship"
        | "partnership"
        | "limited_company"
        | "cooperative"
      document_type:
        | "certificate_incorporation"
        | "memorandum_articles"
        | "shareholding_structure"
        | "company_profile"
        | "directors_id"
        | "company_address_proof"
        | "regulatory_license"
        | "financial_statements"
      invoice_status:
        | "draft"
        | "submitted"
        | "pending"
        | "processing"
        | "approved"
        | "rejected"
        | "paid"
      notification_type:
        | "invoice_submitted"
        | "invoice_approved"
        | "invoice_rejected"
        | "payment_processed"
        | "document_required"
        | "system_update"
      payment_status: "pending" | "processing" | "completed" | "failed"
      user_role: "contractor" | "agency" | "ministry" | "auditor" | "oaia_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      audit_status: ["open", "in_progress", "closed"],
      business_type: [
        "sole_proprietorship",
        "partnership",
        "limited_company",
        "cooperative",
      ],
      document_type: [
        "certificate_incorporation",
        "memorandum_articles",
        "shareholding_structure",
        "company_profile",
        "directors_id",
        "company_address_proof",
        "regulatory_license",
        "financial_statements",
      ],
      invoice_status: [
        "draft",
        "submitted",
        "pending",
        "processing",
        "approved",
        "rejected",
        "paid",
      ],
      notification_type: [
        "invoice_submitted",
        "invoice_approved",
        "invoice_rejected",
        "payment_processed",
        "document_required",
        "system_update",
      ],
      payment_status: ["pending", "processing", "completed", "failed"],
      user_role: ["contractor", "agency", "ministry", "auditor", "oaia_admin"],
    },
  },
} as const
