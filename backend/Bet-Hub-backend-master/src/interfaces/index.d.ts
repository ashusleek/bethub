import { Request } from 'express';
export * from 'models/user';

export interface IRequest extends Request {
  session?: any;
  user?: string | object;
}

export declare namespace IError {
  export interface ICustomError {
    name: string;
    errors: Record<string, any>[];
    message: string;
    status: number;
    details: (string | any)[];
  }

  export interface IGenericFormat {
    message: string | any;
    status?: number;
  }
}

export interface ILogger {
  debug: (message: string, object?: {} | string) => void;
  error: (message: string, object?: {} | string) => void;
}

export interface IEmailTemplate {
  subject: string;
  content: string;
}

export interface ISignedUrl {
  signed_request: any;
  url: string;
}

export interface IMulterRequest extends Request {
  files: Record<string, any>;
}

export interface IMulterFile {
  path: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface IFile {
  file_name: string;
  s3_file_name: string;
  mime_type: number;
  size: number;
  s3_file_url: string;
}

export interface IAxios {
  method: any;
  url: any;
  params?: any;
  data?: any;
  headers?: any;
  auth?: any;
  responseType?: any;
}

/* -------------------------------------------------------------------------- */
/*                              LIST APIS PARAMS                              */
/* -------------------------------------------------------------------------- */

export interface IRetrieveParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: number;
  searchKey?: string;
  searchValue?: string;
  total?: number;
  append?: boolean;
}
