// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
require('dotenv').config();
const axios = require('axios');

const handler = async (event) => {
  try {
    const { site_id } = JSON.parse(event.body)
    const { data } = await axios.post(`https://api.netlify.com/api/v1/sites/${site_id}/builds`, {}, {
        headers: {
          'Authorization': `Bearer ${process.env.NETLIFY_ACCESS_KEY}`
        }
      })
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
