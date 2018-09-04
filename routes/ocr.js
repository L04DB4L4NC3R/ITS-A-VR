const router = require('express').Router();
const multer = require("multer");
var uploads = multer({dest:'uploads/'});
const fs = require('fs');
const pdft = require("pdf-text");
const path = require('path');
const sentiment = require("sentiment");
const Sentiment = new sentiment();



router.post('/',uploads.single('file'), (req,res,next)=>{

    if(req.file === undefined){
        var err = new Error('error');
        next(err);
    }

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
                console.log(analysis)
            }
        });
    });
  
  
});


module.exports = router;    