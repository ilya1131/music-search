const axios = require('axios');
const { secret } = require('../../config/secret');
const enums = require('../../config/enums');
const { config } = require('./../../config/config')
const spotifySecret  = secret[enums.platforms.spotify];
// const urls = {
//     token: 'https://accounts.spotify.com/api/token',
//     api: 'https://api.spotify.com/v1/search'
// }

exports.getToken = async function () {
    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Authorization' : `Basic ${Buffer.from(spotifySecret.clientId + ':' + spotifySecret.secret).toString('base64')}`
    };

    const body = 'grant_type=client_credentials'    
    const { data } = await axios.post(config.endpoints[enums.platforms.spotify].token, body, { headers });
    // const aaa = await axios.post(config.endpoints[enums.platforms.spotify].token, body, { headers });
    // console.log(aaa);
    return data.access_token;
}

// exports.refreshToken = async function (oldToken) {
//     const headers = {
//         'Content-Type' : 'application/x-www-form-urlencoded', 
//         'Authorization' : `Basic ${Buffer.from(spotifySecret.clientId + ':' + spotifySecret.secret).toString('base64')}`
//     }; 
// }

exports.search = async function(token, query) {
    const headers = { 'Authorization' : `Bearer ${token}`};

    try {
        const { data } = await axios.get(config.endpoints[enums.platforms.spotify].search, {
            params: {
                type: 'track',
                q: query,
                limit: 6
            },
            headers
        })

        return data.tracks.items.map((item) => {
            return {
                id: item.id,
                albomId: item.album.id,
                //300*300 image
                image: item.album.images[1],
                name: item.name,
                artist: item.artists.map(artist => artist.name),
                externalLink: embedLink(item.external_urls.spotify),
                link: item.href 
            }
        })

        // console.log(res);
    } catch (e) {
        console.log(`spotify-helper error: ${e}, ${Object.keys(e)}`);
        throw e;
    }
}

function embedLink (link) {
    return link.replace('track', 'embed/track');
}
