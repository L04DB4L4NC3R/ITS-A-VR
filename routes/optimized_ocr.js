const router = require('express').Router();
const multer = require("multer");
var uploads = multer({dest:'uploads/'});
const fs = require('fs');
const {exec} = require('child_process');
const pdftxt = require("pdf-to-text");




router.post('/',uploads.single('file'), (req,res,next)=>{
  
    if(req.file === undefined){
        var err = new Error('error');
        next(err);
    }
    console.log(`${__dirname}/${req.file.path}`)

    pdftxt.pdfToText(`3bfa190b5d1bf82ab8451f2de6c289f8.pdf`,{from:0,to:1},(console.log));

    exec(`rm ${req.file.path}`,(err,stdout,stderr)=>{
        if(err)
            console.log(err);
        else{
            console.log(stdout);
        }
    })
  
  
});



module.exports = router;    