export class StrippedUser{
    public id : number;
    public username : string; 

    /**
     *
     */
    constructor(username: string, id : number) {
        this.id = id;
        this.username = username;
    }

    static clone( user : StrippedUser) : StrippedUser{
        return new StrippedUser(user.username, user.id);
    }
}