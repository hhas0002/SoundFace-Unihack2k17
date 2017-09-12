const spotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new spotifyWebApi({
    clientId : '86a86fa216b44890809b32acdfd44b05',
    clientSecret : '2b0dd2c8b4af431d8b58e4629eeda5a6',
    redirectUri : 'https://2203bb20.ngrok.io/authenticate'
});

function processRequest(req, res){
    res.end();
    console.log(req);
}

// Search artists whose name contains 'Love'
spotifyApi.searchArtists('Love')
    .then(function(data) {
        console.log('Search artists by "Love"', data.body);
    }, function(err) {
        console.error(err);
    });

module.exports = processRequest;