export class Contact {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: number,
    public imageUrl: string,
    public group?: Contact[]
  ) {}
}
