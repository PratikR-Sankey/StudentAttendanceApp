export class Users
{    
    public username: string;
    public password: string;
    public email: string;
    public mobile: number;
    public type: string;
    public division: string;

    constructor(username:string,password:string,email:string,mobile:number,type:string,division:string)
    {
        this.username=username;
        this.password=password;
        this.email=email;
        this.mobile=mobile;
        this.type=type;
        this.division=division;
    }
}