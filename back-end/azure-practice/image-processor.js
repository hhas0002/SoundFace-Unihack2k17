/**
 * Sets the image and calls the Emotion API to determine the emotion depicted in the image.
 * Created by Sudhir Mandarapu on 5/8/17.
 * Last modified on 5/8/17.
 */

const oxfordEmotion = require("node-oxford-emotion")("6ca9f844861d4ae4b6cdb372db4e8fb7");
const serverImageGetterUrl = "https://2203bb20.ngrok.io/getImage";
var img;

function processImage(req, res){
    res.end();
    img = req.body.img;
    oxfordEmotion.recognize("url", serverImageGetterUrl, function(cb) {
        console.log(cb);
    });

}

function returnImage(req, res){
    console.log("request made");

    var bufferImg = new Buffer(img, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': bufferImg.length
    });
    res.end(bufferImg);

}

module.exports = {"processImage" : processImage, "returnImage" : returnImage};