export interface IPost {
    id:string;
    address:string;
    category:string;
    hospitalName:string;
    phoneNumber:number;
    userId:string;
    imgUrl?:string;
}

export interface IPosts {
    posts:IPost[]
}
