export class Comment{
    private static nextId : number = 0;
    public id : number;
    public parent : number;
    public owner : number;
    public content : string;

    /**
     *
     */
    constructor(parent : number, owner: number, content : string) {
        this.id = Comment.nextId++;
        this.parent = parent;
        this.owner = owner;
        this.content = content;
    }
}