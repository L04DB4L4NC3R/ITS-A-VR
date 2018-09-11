$(document).ready(()=>{
    $("#data").html('');
    const socket = io();

    socket.on("data",(data)=>{
        console.log(data);
        $("#data").append(`String:\n\n${data.str}\n\n\n\nAnalysis:\n\n${JSON.stringify( data.analysis) }`);
    });
}); 


