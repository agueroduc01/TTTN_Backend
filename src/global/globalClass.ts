export class ResponseData<type> {
  data: type | type[];
  statusCode: number;
  message: string;

  constructor(data: type | type[], statusCode: number, message: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    return this;
  }
}
