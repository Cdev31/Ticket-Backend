const TicketList = require("./TicketList");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();

        this.ticket = new TicketList()
    }

    socketEvents() {
        
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado')
            
           socket.on('new-ticket', ( data, call )=>{
            const newTicket = this.ticket.createTicket()
            call( newTicket )

           })

           socket.on('next-ticket', ( user, call )=>{
            const yourTicket = this.ticket.assignedTicket( user.agente, user.escritorio )
            call( yourTicket )
           })
            
        
        });
    }


}


module.exports = Sockets;