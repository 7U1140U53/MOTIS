const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  // Only accept GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // Simple hardcoded auth for MVP
  const authHeader = event.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer MOTIS_ADMIN_123') {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    // Connect to the Netlify Blob store named "motis_leads"
    const store = getStore("motis_leads");
    
    // Retrieve the leads array, default to empty if not found
    let leads = [];
    const existing = await store.get("all_leads", { type: "json" });
    if (existing) {
      leads = existing;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ leads }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error("Error retrieving leads from blob:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
