const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

exports.handler = async (event, context) => {
  // CORS Headers to allow CRM dashboard write operations
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

  // Only accept POST requests for update operation
  if (event.httpMethod !== "POST") {
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

  // Parse incoming JSON body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: "Invalid JSON request body" }),
    };
  }

  const { leadId, status, admin_notes } = body;

  // Validate required update fields
  if (!leadId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: "Validation Failed: leadId is required.",
      }),
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseSecretKey);

    // Prepare fields to update
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;

    // Update the record in Supabase
    const { data: updatedLeads, error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", leadId)
      .select();

    if (error) throw error;

    if (!updatedLeads || updatedLeads.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: "Lead record not found" }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Lead updated successfully",
        lead: updatedLeads[0],
      }),
    };
  } catch (error) {
    console.error("Error updating lead record in Supabase:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: error.message || "Internal Server Error while updating lead.",
        details: error.details || null,
        hint: error.hint || null,
        code: error.code || null,
      }),
    };
  }
};
