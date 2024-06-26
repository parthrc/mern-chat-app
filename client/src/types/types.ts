export interface RegisterApiPayload {
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  firstName: string;
  lastName?: string;
}

export interface RegisterApiResponse {
  status: string;
  msg: string;
  data: unknown;
}
