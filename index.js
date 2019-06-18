let app = require('express')();
let http = require("http").Server(app);
let io = require('socket.io')(http);

var dir = __dirname;

app.get('/', (req, res) => {
    res.sendFile(dir + '/index.html');
})

http.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
})


io.sockets.on('connection', (socket) => {
    /**
        \brief Server get new hero and propagate him to all connected clients
    */
    socket.on("new-hero-ToSrv", (data) => {
        socket.broadcast.emit("new-hero-FromSrv", (data))
    })

    /**
        \brief Server removes given hero from all connected clients
    */
    socket.on("remove-hero-ToSrv", (data) => {
        socket.broadcast.emit("remove-hero-FromSrv", (data))
    })

    /**
        \brief Server propagate given changes about hero
    */
    socket.on("update-hero-ToSrv", (data) => {
        socket.broadcast.emit("update-hero-FromSrv", (data))
    })
});
