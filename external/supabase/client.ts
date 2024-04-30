import { createClient } from '@supabase/supabase-js';

// export const supabase = createClient(
//   process.env.PUBLIC_SUPABASE_URL ?? '',
//   process.env.PUBLIC_SUPABASE_ANON_KEY ?? '',
// );

export const supabase = createClient(
  'https://uormulfcuffljcreifwu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcm11bGZjdWZmbGpjcmVpZnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTIwMDMsImV4cCI6MjAyOTI4ODAwM30.tZ329gG_FnqAN-IJ6OZsi6ccHTw9TCQsidJ0k5rQby0',
);
