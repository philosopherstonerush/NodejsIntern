
const axios = require('axios')

async function getBlogPostInfos() {
    let content = axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
        headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
        timeout: 5000,
    }).then(function(response) {
        return response.data
    }).catch(error => {
        throw "Request timed out"
    })

    return content
}


module.exports = {
    getBlogPostInfos
}