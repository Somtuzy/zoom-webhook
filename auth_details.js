const axios = require("axios");

async function fetchToken() {
  const client_id_and_secret_in_base_64 = btoa(encodeURI(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`))

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

module.exports =  async function fetchRequestDetails() {
  const baseUrl = `https://api.zoom.us/v2`
  const { access_token } = await fetchToken();

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${access_token}`
  };

  const response = await axios.get(`${baseUrl}/users/me`, { headers });
  
  return { id: response.data.id, headers, baseUrl };
}