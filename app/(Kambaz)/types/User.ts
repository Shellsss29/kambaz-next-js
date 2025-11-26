export interface User {
  _id?: string;
  username: string; // required
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: "ADMIN" | "FACULTY" | "TA" | "STUDENT" | "USER";
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
}
