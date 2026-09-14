export type UserType = {
  id: string;
  name: string;
  email: string;
  user_name: string;
  role: string;
  bio: string;
  created_at: string;
};

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};
