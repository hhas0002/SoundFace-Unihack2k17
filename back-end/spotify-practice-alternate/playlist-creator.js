var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = 'b6b386ae95844943861b17686056e06e'; // Your client id
var client_secret = '7046e4136072454282510b1d0aa18307'; // Your secret
var redirect_uri = 'http://localhost:1337/callback'; // Your redirect uri

var spotifyApi = new SpotifyWebApi({
    clientId : client_id,
    clientSecret : client_secret,
    redirectUri : redirect_uri
});

spotifyApi.setAccessToken('BQCbQPenoifCxkj3EO5BfmCbieQiAZ2Qk8phQ6lXbtTLu0GeXUZvqg3OUwOd9rtYLMQSZRrcXmGdlaDyVtEdxspx7T39BDfTGuyYyieCIUVoLe0QkO2x7mVkonHP9riUTBepG5nrlpp3NnKkaGi6EJQPOiqh0_9APRCORGbsxm4RH8sWi23yq23XwkP1mTo&refresh_token=AQA_u9RnpOv2NhkcD2sGH11PisRmrch3eR7cXXT6CjRbk6ak8Pu5rMUvx_pbz_gq8XRL3EnHo99GHHMNQrWcfSqlstESgFBdaHXsWCQhf2N_2bojVREsiSOeuxZQHUYAts8');

var userEmotion;
var userSongs;
var userId;

function songsHandler(emotion, songs){
    userEmotion = emotion;
    userSongs = songs;
    spotifyApi.getMe()
        .then(userDetailsHandlers, function(err) {
            console.log('Something went wrong!', err);
        });
}


function userDetailsHandlers(data){
    userId = data.body.id;
    spotifyApi.createPlaylist(userId, 'Sound Face Playlist: '+userEmotion, { 'public' : false })
        .then(function(data) {
            console.log(data);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

/*
// Create a private playlist
spotifyApi.createPlaylist('thelinmichael', 'My Cool Playlist', { 'public' : false })
    .then(function(data) {
        console.log('Created playlist!');
    }, function(err) {
        console.log('Something went wrong!', err);
    });
    */

module.exports = songsHandler;