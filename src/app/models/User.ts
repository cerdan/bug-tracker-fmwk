export class User{
    public id : number;
    public username : string; 
    public cpf : string; 
    public name: string;
    public email: string;
    public password:string;

    /**
     *
     */
    constructor(username: string, name : string, email : string, password : string, cpf : string) {
        this.id = Math.round((Math.random())*1000)+Math.round((Math.random())*1000)*1000;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
    }

    static clone( user : User) : User{
        let u = new User(user.username, user.name, user.email, user.password, user.cpf);
        u.id = user.id;
        return u;
    }
}