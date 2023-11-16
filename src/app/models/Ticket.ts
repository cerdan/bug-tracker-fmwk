export class Ticket{
    private static nextId : number = 0;
    public id : number;
    public owner : number;
    public title: string;
    public severity:| string;
    public affectedItem:string;
    public attributedTo :number;
    public description : string;
    /**
     *
     */
    constructor(id : number, owner: number, title : string, severity : string, affectedItem : string, attributedTo : number, description : string) {
        this.id = Ticket.nextId++;
        this.owner = owner;
        this.title = title;
        this.severity = severity;
        this.affectedItem = affectedItem;
        this.attributedTo = attributedTo;
        this.description = description;
    }
}