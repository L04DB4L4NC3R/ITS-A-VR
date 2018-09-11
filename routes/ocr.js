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

    let buffer = fs.readFileSync(path.resolve(__dirname, '../uploads/'+req.file.filename));

    pdft(buffer,(err,data)=>{
        fs.unlinkSync(path.resolve(__dirname, '../uploads/'+req.file.filename));
        if(err)
            console.log(err);
        let str = '';
        for(let i of data)
            str+=i;
        
        res.json({text:data,sentiment:Sentiment.analyze(str)});
    });

  
  
});


module.exports = router;    