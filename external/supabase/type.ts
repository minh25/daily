import { Database } from '@/external/supabase/schema';

export type Todo = Database['public']['Tables']['todo']['Row'];
