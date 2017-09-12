
function getSongsForEmotions(emotion, details){
    var playlistSongs = [];
    for(var songId in details){
        var songEmotion = classifySong(details[songId]);
        console.log(songEmotion);
        if (emotion === songEmotion){
            playlistSongs.push(details[songId]);
            if(playlistSongs.length >= 20){
                break;
            }
        }
    }
    var createPlaylist = require('./playlist-creator');
    createPlaylist(emotion, playlistSongs);
    return;
}

var threshholds = {
    "danceability" : [0.55, 0.8],
    "energy" : [0.3, 0.5],
    "loudness" : [-12, -6.5],
    "valence" : [0.4, 0.65],
    "tempo" : [85, 110]
};

var emotionStats = {
    "fear" : {
      "tempo" : ["low"],
      "valence" : ["low"],
      "danceability" : ["low"],
      "loudness" : ["medium"],
      "energy" : ["high"]
  },
    "happiness" : {
        "tempo" : ["high", "medium"],
        "valence" : ["high"],
        "danceability" : ["medium", "high"],
        "loudness" : ["high", "medium"],
        "energy" : ["high", "medium"]
    },
    "neutral" : {
        "tempo" : ["low", "medium"],
        "valence" : ["medium"],
        "danceability" : ["low"],
        "loudness" : [],
        "energy" : ["medium"]
    },
    "sadness" : {
        "tempo" : ["low"],
        "valence" : ["low"],
        "danceability" : ["low"],
        "loudness" : ["low", "medium"],
        "energy" : ["low"]
    },
    "surprise" : {
        "tempo" : ["high"],
        "valence" : ["medium"],
        "danceability" : ["medium"],
        "loudness" : ["high"],
        "energy" : ["high"]
    }
};

var weights = {
    "fear" : {
        "tempo" : 3,
        "valence" : 4,
        "danceability" : 0,
        "loudness" : 2,
        "energy" : 1
    },
    "happiness" : {
        "tempo" : 3,
        "valence" : 1.5,
        "danceability" : 2,
        "loudness" : 0.5,
        "energy" : 3
    },
    "neutral" : {
        "tempo" : 3.5,
        "valence" : 1,
        "danceability" : 3,
        "loudness" : 1,
        "energy" : 1.5
    },
    "sadness" : {
        "tempo" : 3,
        "valence" : 4,
        "danceability" : 1,
        "loudness" : 0,
        "energy" : 2
    },
    "surprise" : {
        "tempo" : 3,
        "valence" : 2,
        "danceability" : 1.5,
        "loudness" : 1.5,
        "energy" : 2
    }
};

function classifySong(songObject){
    for(var attribute in threshholds){
        if(attribute !== "name" && attribute !== "track_href"){
            songObject[attribute] = parseFloat(songObject[attribute]);
            if(songObject[attribute] < threshholds[attribute][0]){
                songObject[attribute] = "high";
            }
            else if(songObject[attribute] > threshholds[attribute][1]){
                songObject[attribute] = "low";
            } else {
                songObject[attribute] = "medium";
            }
        }
    }

    var songScores = {"fear" : 0, "happiness" : 0, "neutral" : 0, "sadness" : 0, "surprise" : 0};
    for(var emotion in emotionStats){
        for(var stat in emotionStats[emotion]){
            if(contains(emotionStats[emotion][stat], songObject[stat])){
                songScores[emotion] += weights[emotion][stat];
            }
        }
    }
    return getMostProminentEmotion(songScores);
}

function getMostProminentEmotion(songScores) {
    var mostProminentEmotion;
    var mostProminentValue = -1;
    for(var emotion in songScores){
        if(songScores[emotion] > mostProminentValue){
            mostProminentEmotion = emotion;
            mostProminentValue = songScores[emotion];
        }
    }
    return mostProminentEmotion;
}

function contains(array, target){
    for(var i = 0; i < array.length; i++){
        if(target === array[i]){
            return true;
        }
    }
    return false;
}

module.exports = getSongsForEmotions;