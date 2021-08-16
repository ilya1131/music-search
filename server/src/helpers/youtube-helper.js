const axios = require('axios');
const { secret } = require('../../config/secret');
const enums = require('../../config/enums');
const { config } = require('./../../config/config')
const youtubeSecret = secret[enums.platforms.youtube];

const searchYoutube = async (query) => {
    try {
        const responce = await axios.get(config.endpoints[enums.platforms.youtube].search, {
            params: {
                key: youtubeSecret.apiKey,
                part: 'snippet',
                type: 'video',
                q: query,
                maxResults: 6
            }
        })
        const ids = responce.data.items.map(item => item.id.videoId);

        return ids;
    } catch (e) {
        console.log(`youtube helper error: ${e}`);
    }
    
}

exports.searchYoutube = searchYoutube;