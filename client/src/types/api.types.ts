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

export interface LoginApiPayload {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  status: string;
  msg: string;
  data: {
    id: string;
    firstName: string;
    lastName?: string;
    gender: string;
    profilePic?: string;
  };
}



export interface GetActiveConversationsApiResponse {
  status: string;
  msg: string;
  totalActiveConversation: number;
  data: [];
}
