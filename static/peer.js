$(document).ready(()=>{
    $("#data").html('');
    const socket = io.connect();

    socket.on("connect",()=>{
        $("#data").html('');
        console.log(socket.id.toString())
        socket.on(socket.id.toString(),(data)=>{
            console.log(socket.id.toString());
            $("#data").append(`String:\n\n${data.str}\n\n\n\nAnalysis:\n\n${JSON.stringify( data.analysis) }`);
        });
    });
}); 


