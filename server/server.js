const express = require('express');
const cors = require('cors');

const { config, endpoints } = require('./config/config');
const enums = require('./config/enums');
const { searchYoutube } = require('./src/helpers/youtube-helper');
const spotifyHelper = require('./src/helpers/spotify-helper');

const app = express();
const session = {};

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}))

app.get('/search', search);

app.listen(config.server.port, () => {
    console.log(`app is running at ${config.server.hostname}:${config.server.port}`);
})
updateToken();

async function updateToken () {
    const token = await spotifyHelper.getToken();
    session.token = token;
}

async function search (req, res) {
    
    try {
        const { searchQuery } = req.query;
        console.log(searchQuery)
        const youtubeIds = await searchYoutube(searchQuery)
        const spotifySongs = await spotifyHelper.search(session.token, searchQuery)
        res.json({youtube: youtubeIds, spotify: spotifySongs});
    } catch (error) {
        console.log(`search error: ${error}`);
        if (error.response.status == 401) {
            console.log(error.response.status, typeof error.response.status);
            await updateToken();    
            search(req, res);
        }
        // await init();
        ;
    }
}