import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://tdwjjgqqnbobrpuyfpfk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkd2pqZ3FxbmJvYnJwdXlmcGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NTQwNjIsImV4cCI6MjAzMTUzMDA2Mn0.G3eYlxmQ86zfgBIrshwoOg7KwPb7ttuBycYVRec0zT8"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;