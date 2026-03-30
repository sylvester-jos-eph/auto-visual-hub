import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knauvnowdnqccsiwidpg.supabase.co';
const supabaseKey = 'sb_publishable_qylqQ14WYCO4wm3-YNlH_g_PE01JYIp';

export const supabase = createClient(supabaseUrl, supabaseKey);