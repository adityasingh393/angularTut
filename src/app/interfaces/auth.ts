export interface Register {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface UserInfo{
    email:string;
    userName:string;
    phoneNumber:string;
    age:number;
}