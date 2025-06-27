
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Invoice {
  id: string;
  contractor_id: string;
  agency_id?: string;
  invoice_number: string;
  contract_reference?: string;
  service_description: string;
  amount: number;
  work_period?: string;
  completion_date?: string;
  invoice_date: string;
  due_date: string;
  payment_terms: string;
  advance_percentage: number;
  advance_amount: number;
  status: 'draft' | 'submitted' | 'pending' | 'processing' | 'approved' | 'rejected' | 'paid';
  submitted_at?: string;
  approved_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    organization_name: string;
    email: string;
  };
}

export function useInvoices(userId?: string) {
  return useQuery({
    queryKey: ['invoices', userId],
    queryFn: async () => {
      let query = supabase
        .from('invoices')
        .select(`
          *,
          profiles:contractor_id (
            organization_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('contractor_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching invoices:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!userId
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceData: Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'profiles'>) => {
      const { data, error } = await supabase
        .from('invoices')
        .insert([invoiceData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice created successfully');
    },
    onError: (error) => {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    }
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Invoice> }) => {
      const { data, error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice updated successfully');
    },
    onError: (error) => {
      console.error('Error updating invoice:', error);
      toast.error('Failed to update invoice');
    }
  });
}
