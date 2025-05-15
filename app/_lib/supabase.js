import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
/*
export const supabaseUrl = "https://dclaevazetcjjkrzczpc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbGFldmF6ZXRjamprcnpjenBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyOTIzNDQsImV4cCI6MTk5ODg2ODM0NH0.LGg0M-taoHgKtxCzr9owrb09epnPaO_Yfz6xVE54sIY";
const supabase = createClient(supabaseUrl, supabaseKey);

Option 2:
export const supabaseUrl = "https://bkxptjmdffrrbvolrdii.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreHB0am1kZmZycmJ2b2xyZGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNzc4MDcsImV4cCI6MjA1Mjc1MzgwN30.jSZhlt1yAxh6WjaOdD6eFruFP0ffh35XVMYP6YhCGfQ";
const supabase = createClient(supabaseUrl, supabaseKey);
*/
export default supabase;

//project_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreHB0am1kZmZycmJ2b2xyZGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNzc4MDcsImV4cCI6MjA1Mjc1MzgwN30.jSZhlt1yAxh6WjaOdD6eFruFP0ffh35XVMYP6YhCGfQ
