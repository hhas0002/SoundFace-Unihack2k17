/**
 * Azure Practice
 */

var oxfordEmotion = require("node-oxford-emotion")("6ca9f844861d4ae4b6cdb372db4e8fb7")
oxfordEmotion.recognize("url","http://www.manutd.com/sitecore/shell/~/media/291EA2C78E9244E5AA6B2200A3C14F88.ashx?w=1280&h=720&rgn=0,346,2000,1471", function(cb) {
    console.log(cb);
});