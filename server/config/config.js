const enums = require('./enums')

const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const endpoints = {
    [enums.platforms.spotify]: {
        token: 'https://accounts.spotify.com/api/token',
        search: 'https://api.spotify.com/v1/search'
    },
    [enums.platforms.youtube]: {
        search: 'https://www.googleapis.com/youtube/v3/search'
    }
}

exports.config = {
    server: SERVER,
    endpoints
}