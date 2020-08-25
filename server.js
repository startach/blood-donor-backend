const app = require('./src/app');

app.set('port', process.env.PORT || 4000)
let port = app.get('port')


const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on("connection", socket => {
    console.log("New client connected");
    require('./src/controllers/socketIo').setConnection(socket)
    socket.on("disconnect", () => {
      console.log("Client disconnected");
 
    });
});

server.listen(port, () => {
    console.log(`App running on port:${port}`)
})
