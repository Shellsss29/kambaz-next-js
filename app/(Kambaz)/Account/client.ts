import { User } from "../types/User";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const findAllUsers = async () => {
  const response = await fetch(USERS_API, { credentials: "include" });
  return response.json();
};

export const findUsersByRole = async (role: string) => {
  const response = await fetch(`${USERS_API}?role=${role}`, {
    credentials: "include",
  });
  return response.json();
};

export const findUsersByPartialName = async (name: string) => {
  const response = await fetch(`${USERS_API}?name=${name}`, {
    credentials: "include",
  });
  return response.json();
};

export const findUserById = async (id: string) => {
  const response = await fetch(`${USERS_API}/${id}`, {
    credentials: "include",
  });
  return response.json();
};

export const adminCreateUser = async (user: User) => {
  const resp = await fetch(`${USERS_API}/admin/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return resp.json();
};

export interface Credentials {
  username: string;
  password: string;
}

export const signin = async (credentials: Credentials) => {
  const response = await fetch(`${USERS_API}/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json() as Promise<User>;
};

export const signup = async (user: User) => {
  const response = await fetch(`${USERS_API}/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json() as Promise<User>;
};

export const profile = async () => {
  const response = await fetch(`${USERS_API}/profile`, {
    method: "POST",
    credentials: "include",
  });
  return response.json() as Promise<User>;
};

export const signout = async () => {
  const response = await fetch(`${USERS_API}/signout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};

export const updateUser = async (user: User) => {
  const response = await fetch(`${USERS_API}/${user._id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json() as Promise<User>;
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${USERS_API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const createUser = async (user: User) => {
  const response = await fetch(USERS_API, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};
