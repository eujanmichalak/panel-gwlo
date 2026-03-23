import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // DODAJEMY TO PONIŻEJ:
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://irhjnxbvkmnclskgsqfy.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaGpueGJ2a21uY2xza2dzcWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTcxNDcsImV4cCI6MjA4OTQzMzE0N30.ASec9q8qWwacXWsbOz9U_YwtUK8Werwi7RXeLgHpFgY",
  },
};

export default nextConfig;