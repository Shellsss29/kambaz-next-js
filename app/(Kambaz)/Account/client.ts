import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  _id?: string;
  username: string;
  password: string;
  [key: string]: unknown;
}

export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data as User;
};

export const signup = async (user: User) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data as User;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data as User;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data as { message: string };
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data as User;
};
