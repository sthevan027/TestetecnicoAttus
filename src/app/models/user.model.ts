export type PhoneType = 'mobile' | 'landline' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}

export type UserDraft = Omit<User, 'id'> & { id?: string };
