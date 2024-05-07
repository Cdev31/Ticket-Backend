const Ticket = require('./Ticket')


class TicketList {

    constructor(){
        this.lastNumber = 0
        this.earrings = []
        this.assigned = []
    }

    get nextNumber(){
        this.lastNumber++
        return this.lastNumber
    }

    get last13(){
        return this.assigned.slice(0,13)
    }

    createTicket(){
        const newTicket = new Ticket( this.nextNumber )
        this.earrings.push( newTicket )
        return newTicket
    }

    assignedTicket( agent, desk ){
        
        if( this.earrings.length === 0 ){
            return null
        }
        
        const nextTicket = this.earrings.shift()

        nextTicket.agent = agent
        nextTicket.desk = desk

        this.assigned.unshift( nextTicket )

        return nextTicket
    }

}

module.exports = TicketList