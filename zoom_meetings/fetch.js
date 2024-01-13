const axios = require("axios");

module.exports = async function getResource(method, url, headers, body = {}) {
    if(Object.keys(body).length > 0) {
        const response = await axios[method](url, body, { headers });
        return response.data
    }

    const response = await axios[method](url, { headers });
    return response.data
}