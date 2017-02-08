/* 
    Create class Contact. 
    Contact will be another type like string, boolean or number primitive types.
    This will define the type Contact we'll use to create our contacts

*/
export class Contact {
  constructor(public id: number, public image: string, public name: string, public surname: string, public address: string, public zipcode: string, public city: string, public phone: string, public email: string, public favorite: boolean) {}
}