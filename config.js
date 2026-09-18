// v6 automatic price watch configuration.
// This file is intentionally safe to publish. Do NOT put service-role keys or secret API keys here.
window.PRICE_WATCH_CONFIG = {
  // Example after Supabase Edge Function deployment:
  // apiBase: "https://YOUR_PROJECT.supabase.co/functions/v1/price-watch",
  apiBase: "",
  // Optional low-risk refresh token if the Edge Function implements one.
  // Prefer authenticated access; never expose a Supabase service_role key here.
  refreshToken: ""
};
