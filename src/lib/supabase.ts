import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://iowejpqoezjjfrecqiip.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_elnIruVaTahhg9XpaUTw5Q_Zcgx2nwG";

export const supabase = createClient(supabaseUrl, supabaseKey);
