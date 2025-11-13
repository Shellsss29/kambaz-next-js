export interface Course {
  _id?: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
  department: string;
  credits: number;
  image?: string;
  [key: string]: unknown;
}
