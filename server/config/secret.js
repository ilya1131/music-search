const { platforms } = require('./enums');

exports.secret = {
    [platforms.spotify]: {
        clientId: 'enter client id',
        secret: 'enter secret'
    },
    [platforms.youtube]: {
        apiKey: 'enter api key'
    }
}
