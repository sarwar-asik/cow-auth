import { IGenericErrorMessage } from './Ierror';

export type IGenericResponse = {
  statusCode: number;
  message: string;
  // errorMessages:{
  //     path:string,
  //     message:string
  // }[]
  errorMessages: IGenericErrorMessage[];
};

export type IGenericCowResponse<T> = {
  meta: {
    page: number | null ;
    limit: number | null ;
    total: number | null ;
  };
  data: T;
};
