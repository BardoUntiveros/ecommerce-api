import { RoleName } from '../roles/roles.enum';

export interface IUserPayload {
  id: string;
  name: string;
  email: string;
  roles: RoleName[];
}

export interface ISignInResponse {
  accessToken: string;
  expirationTime: string;
}

export interface ISignInRequest extends Request {
  user: IUserPayload;
}
