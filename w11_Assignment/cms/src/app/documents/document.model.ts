export class Document {
  public _id: string;

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public url: string,
    public children?: Document[]
  ) {}
}
