
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Email {
  id: string;
  gmail_message_id: string;
  sender_email: string;
  sender_name: string | null;
  subject: string;
  ai_summary: string;
  category: string;
  original_content: string | null;
  received_at: string;
  processed_at: string | null;
  is_read: boolean;
}

export interface EmailCategory {
  id: string;
  name: string;
  icon: string;
  color_class: string;
  keywords: string[];
}

export const useEmails = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['emails', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('user_id', user.id)
        .order('received_at', { ascending: false });

      if (error) throw error;
      return data as Email[];
    },
    enabled: !!user,
  });
};

export const useEmailCategories = () => {
  return useQuery({
    queryKey: ['email_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as EmailCategory[];
    },
  });
};

export const useMarkEmailRead = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (emailId: string) => {
      const { error } = await supabase
        .from('emails')
        .update({ is_read: true })
        .eq('id', emailId)
        .eq('user_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
  });
};
