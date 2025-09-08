// import { v4 as uuidv4 } from 'uuid';

export type userType = 'admin' | 'user' | 'invited';

export interface IPersona {
  id: string;
  fullname: string;
  dni: string;
  email: string;
  phone: string;
  roll: userType;
  active: boolean;
}
