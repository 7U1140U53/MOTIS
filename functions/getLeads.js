const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

exports.handler = async (event, context) => {
  // CORS Headers to allow CRM dashboard queries
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight CORS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "CORS Preflight Success" }),
    };
  }

  // Only accept GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  // Simple token-based admin authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || authHeader !== "Bearer MOTIS_ADMIN_123") {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        message: "Access Denied: Invalid Security Token",
      }),
    };
  }

  // Check database configuration
  if (!supabaseUrl || !supabaseSecretKey) {
    console.error(
      "Configuration Error: Supabase credentials missing in Environment Variables!",
    );
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Server database configuration is missing.",
      }),
    };
  }

  // Extract query filters from URL
  const queryParams = event.queryStringParameters || {};
  const { brand, status } = queryParams;

  try {
    const supabase = createClient(supabaseUrl, supabaseSecretKey);

    // Initialize query
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false }); // Sort newest first!

    // Apply Brand dynamic filter (supporting Unilever-style scaling)
    if (brand && brand !== "all") {
      query = query.eq("brand", brand);
    }

    // Apply Status dynamic filter
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Execute query
    const { data: leads, error } = await query;

    if (error) throw error;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        leads,
      }),
    };
  } catch (error) {
    console.error("Error retrieving leads from Supabase:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Internal Server Error while retrieving leads.",
      }),
    };
  }
};
