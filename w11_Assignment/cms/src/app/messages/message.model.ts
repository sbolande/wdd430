export class Message {
  public _id: string;
  public id: string;

  constructor(
    public subject: string,
    public msgText: string,
    public sender: string
  ) {}
}
