const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        this.server = http.createServer( this.app );
        
   
        this.io = socketio( this.server, { /* configuraciones */ } );

        this.sockets = new Sockets( this.io )
    }

    middlewares() {

        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        this.app.use( cors() );

        this.app.get('/last', ( _, res )=>{
            res.status(200).json({
                lastTickets: this.sockets.ticket.last13
            })
        })

    }

   

    execute() {

        this.middlewares();

        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;