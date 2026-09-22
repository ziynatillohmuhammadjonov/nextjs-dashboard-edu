export type UserType = {
  id: number;
  name: string;
  email: string;
  userName: string;
  role: string;
  bio: string | null;
  avatarUrl: string | null;
  avatarKey: string | null;
  createdAt: Date;
};

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export const initialFormState: FormState = { success: false, message: "" };
