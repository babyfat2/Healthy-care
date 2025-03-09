import { HttpException } from "@nestjs/common";
import { HttpStatusCode } from "./globalEnum";

export class ResponseData<D> {
    data: D | D[];
    statusCode: number;
    message: string;
  
    constructor(data: D | [], statusCode: number, message: string) {
      if (
        statusCode == HttpStatusCode.SUCCESS ||
        statusCode == HttpStatusCode.CREATED
      ) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        return this;
      }
      throw new HttpException(
        {
          status: statusCode,
          message: message,
          data,
        },
        statusCode,
      );
    }
  }