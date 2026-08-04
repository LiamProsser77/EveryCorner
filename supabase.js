// EveryCorner Supabase Connection

const SUPABASE_URL = "https://tsqcfchlsjmuqhrhuzpr.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_8hA4BSzmIoCWKmGYnkf12w_s5NFf9BY";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
