import { HttpException } from "@nestjs/common";
import { HttpStatusCode } from "./globalMessage";

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


  type pagination = {
    total: number;
    page: number;
    row: number;
  }

  export class PaginationResponse<D> {
    data: D | D[];
  
    pagination: pagination;
  
    constructor(data: D | [], pagination: pagination) {
      this.data = data;
      this.pagination = pagination;
      return this;
    }
  }
  