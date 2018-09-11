const router = require('express').Router();
const multer = require("multer");
var uploads = multer({dest:'uploads/'});
const fs = require('fs');
const pdft = require("pdf-text");
const path = require('path');
const sentiment = require("sentiment");
const Sentiment = new sentiment();


/**
 * @api {post} /ocr submit PDF
 * @apiName submit PDF
 * @apiGroup user
 * @apiParam {file} file upload multpart file data
 * 
 * 
 * @apiParamExample {json} response-example
 * 
 * {
    "text": [
        "There were once two brothers who lived on the edge of a forest. The elder brother was very mean to",
        "his younger brother and ate up all the food and took all his good clothes. One day, the elder brother ",
        "went into the forest to find some firewood to sell in the market. As he went around chopping the ",
        "branches of a tree",
        "after tree, he came upon a magical tree. The tree said to him, ‘Oh kind sir, please ",
        "do not cut my branches. If you spare me, I will give you my golden apples’. The elder brother ",
        "agreed but was disappointed with the number apples the tree gave him. Greed overcame him, and he",
        "threatened to cut the entire trunk if the tree didn’t give him more apples. The magical tree instead ",
        "showered upon the elder brother hundreds upon hundreds of tiny needles. The elder brother lay on ",
        "the ground crying in pain as the sun began to lower down the horizon.",
        "The younger brother grew",
        "worried and went in search of his elder brother. He found him with ",
        "hundreds of needles on his skin. He rushed to his brother and removed each needle with painstaking",
        "love. After he finished, the elder brother apologised for treating him badly and promised to be ",
        "better. The tree saw the change in the elder brother’s heart and gave them all the golden apples they ",
        "could ever need."
    ],
    "sentiment": {
        "score": -3,
        "comparative": -0.013043478260869565,
        "tokens": [
            "there",
            "were",
            "once",
            "two",
            "brothers",
            "who",
            "lived",
            "on",
            "the",
            "edge",
            "of",
            "a",
            "forest",
            "the",
            "elder",
            "brother",
            "was",
            "very",
            "mean",
            "tohis",
            "younger",
            "brother",
            "and",
            "ate",
            "up",
            "all",
            "the",
            "food",
            "and",
            "took",
            "all",
            "his",
            "good",
            "clothes",
            "one",
            "day",
            "the",
            "elder",
            "brother",
            "went",
            "into",
            "the",
            "forest",
            "to",
            "find",
            "some",
            "firewood",
            "to",
            "sell",
            "in",
            "the",
            "market",
            "as",
            "he",
            "went",
            "around",
            "chopping",
            "the",
            "branches",
            "of",
            "a",
            "treeafter",
            "tree",
            "he",
            "came",
            "upon",
            "a",
            "magical",
            "tree",
            "the",
            "tree",
            "said",
            "to",
            "him",
            "‘oh",
            "kind",
            "sir",
            "please",
            "do",
            "not",
            "cut",
            "my",
            "branches",
            "if",
            "you",
            "spare",
            "me",
            "i",
            "will",
            "give",
            "you",
            "my",
            "golden",
            "apples’",
            "the",
            "elder",
            "brother",
            "agreed",
            "but",
            "was",
            "disappointed",
            "with",
            "the",
            "number",
            "apples",
            "the",
            "tree",
            "gave",
            "him",
            "greed",
            "overcame",
            "him",
            "and",
            "hethreatened",
            "to",
            "cut",
            "the",
            "entire",
            "trunk",
            "if",
            "the",
            "tree",
            "didn’t",
            "give",
            "him",
            "more",
            "apples",
            "the",
            "magical",
            "tree",
            "instead",
            "showered",
            "upon",
            "the",
            "elder",
            "brother",
            "hundreds",
            "upon",
            "hundreds",
            "of",
            "tiny",
            "needles",
            "the",
            "elder",
            "brother",
            "lay",
            "on",
            "the",
            "ground",
            "crying",
            "in",
            "pain",
            "as",
            "the",
            "sun",
            "began",
            "to",
            "lower",
            "down",
            "the",
            "horizonthe",
            "younger",
            "brother",
            "grewworried",
            "and",
            "went",
            "in",
            "search",
            "of",
            "his",
            "elder",
            "brother",
            "he",
            "found",
            "him",
            "with",
            "hundreds",
            "of",
            "needles",
            "on",
            "his",
            "skin",
            "he",
            "rushed",
            "to",
            "his",
            "brother",
            "and",
            "removed",
            "each",
            "needle",
            "with",
            "painstakinglove",
            "after",
            "he",
            "finished",
            "the",
            "elder",
            "brother",
            "apologised",
            "for",
            "treating",
            "him",
            "badly",
            "and",
            "promised",
            "to",
            "be",
            "better",
            "the",
            "tree",
            "saw",
            "the",
            "change",
            "in",
            "the",
            "elder",
            "brother’s",
            "heart",
            "and",
            "gave",
            "them",
            "all",
            "the",
            "golden",
            "apples",
            "they",
            "could",
            "ever",
            "need"
        ],
        "words": [
            "better",
            "promised",
            "badly",
            "apologised",
            "pain",
            "crying",
            "cut",
            "greed",
            "disappointed",
            "agreed",
            "cut",
            "please",
            "kind",
            "good"
        ],
        "positive": [
            "better",
            "promised",
            "agreed",
            "cut",
            "please",
            "kind",
            "good"
        ],
        "negative": [
            "badly",
            "apologised",
            "pain",
            "crying",
            "cut",
            "greed",
            "disappointed"
        ]
    }
}
 * 
 */
router.post('/',uploads.single('file'), (req,res,next)=>{

    if(req.file === undefined)
        next(new Error('error'));
    let io = req.app.socket;

    let readstream = fs.createReadStream(path.resolve(__dirname, '../uploads/'+req.file.filename));
    readstream.on("error",console.log);
    
    readstream.on("data",(buffer)=>{
        
        pdft(buffer,(err,chunk)=>{
            if(err)
                console.log(err);
            else{
                let str = '';
                for(let i of chunk)
                    str+=i;
                let analysis = Sentiment.analyze(str);
                io.sockets.on("connection",(client)=>{
                   // client.send(client.id); 
                    console.log(client.id);
                    io.sockets.emit(client.id.toString(),{str,analysis});
                });
            }
        });
    });
  
  
});


module.exports = router;    