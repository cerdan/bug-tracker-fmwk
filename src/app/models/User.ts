export class User{
    private static nextId : number = 0;
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
        this.id = User.nextId++;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
    }
}