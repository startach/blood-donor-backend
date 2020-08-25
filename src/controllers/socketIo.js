const socketIo = {
    connection: null,
    setConnection: function(conn) {
        console.log('connection set')
        this.connection = conn; 
        
    },
    getConnection: function() {
        return this.connection;
    } 
}

module.exports = socketIo;