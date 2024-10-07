export interface AllUsers {
  allUser: User[];
}

export interface User {
  _id?: string;
  userName?: string;
  phoneNumber?: string;
  age?: number;
  email: string;
}
