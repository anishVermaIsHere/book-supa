
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supaBase = createClient(supabaseUrl, supabaseKey);


export default supaBase;