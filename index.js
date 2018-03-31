//export GOOGLE_APPLICATION_CREDENTIALS="./apikey.json"

const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const ocr=require('./routes/ocr');
const app=express();


app.set("view engine","ejs");
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/',(req,res,next)=>{
    res.render('index',{music:'none'});//res.render('index',{music:'none'});
});



app.get('/:token',(req,res,next)=>{

    res.render('vr',{"text":"test text","analysis":"test"});

});


app.use('/ocr',ocr);




app.use(function(err,req,res,next){
    console.log(err.message);

});

app.listen(3000,function(err,result){
  console.log("Connected to server ");
});
