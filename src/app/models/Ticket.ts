export class Ticket{
    public id : number;
    public userId : number;
    public title: string;
    public severity: string;
    public affectedItem:string;
    public attributedTo :number;
    public description : string;
    /**
     *
     */
    constructor(userId: number, title : string, severity : string, affectedItem : string, attributedTo : number, description : string) {
        this.id = Math.round((Math.random())*1000)+Math.round((Math.random())*1000)*1000;
        this.userId = userId;
        this.title = title;
        this.severity = severity;
        this.affectedItem = affectedItem;
        this.attributedTo = attributedTo;
        this.description = description;
    }

    static clone(ticket : Ticket) : Ticket{
        let t = new Ticket(ticket.userId, ticket.title, ticket.severity, ticket.affectedItem, ticket.attributedTo, ticket.description);
        t.id = ticket.id;
        return t;
    }
}