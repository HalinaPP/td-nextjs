export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
}

export interface IContact {
  address: IAddress;
  company: ICompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ISocial {
  id: number;
  icon: string;
  path: string;
}
