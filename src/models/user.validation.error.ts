
export class ValidationError  {
    
    
    constructor(private name:string,private message:string,private path?:string,private status?:number) {
        this.message = message;
        this.name = name; 
        this.status = status;
        this.path =   path; //error.path;
    }

    toJson() {
        if(this.path){
            return {
                name: this.name,
                status: this.status,
                message: this.message,
                path: this.path,
            };
        }else{
            return {
                name: this.name,
                status: this.status,
                message: this.message,
             };
        }
    }
}

//module.exports = ValidationError;