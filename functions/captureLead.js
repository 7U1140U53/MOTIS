const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // Parse incoming lead data
  let lead;
  try {
    lead = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    // Connect to the Netlify Blob store named "motis_leads"
    const store = getStore("motis_leads");

    // Load existing leads or start with empty array
    let leads = [];
    const existing = await store.get("all_leads", { type: "json" });
    if (existing) {
      leads = existing;
    }

    // Append new lead with metadata
    leads.push({
      id: Date.now(),
      ...lead,
      capturedAt: new Date().toISOString(),
    });

    // Write back to blob store
    await store.setJSON("all_leads", leads);

    // Redirect to home page or send success response
    return {
      statusCode: 302, // Redirect after form submit
      headers: {
        Location: '/index.html?success=true',
      },
      body: 'Redirecting...',
    };
  } catch (error) {
    console.error("Error saving lead to blob:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
