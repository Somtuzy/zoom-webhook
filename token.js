const axios = require("axios");

module.exports = async function fetchToken() {
  const client_id_and_secret_in_base_64 = btoa(encodeURI(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`))

  // Example: Retrieve past meetings
  const response = await axios.post(`https://zoom.us/oauth/token`, {
    "grant_type": "account_credentials",
    account_id: process.env.ACCOUNT_ID
  }, {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${client_id_and_secret_in_base_64}` 
    },
  });

  return response.data
}