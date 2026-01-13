
export interface StudentRecord {
  "Student ID": string | number;
  "Student Name": string;
  "Course": string;
  "Grade": string | number;
  "Semester"?: string;
  "Status"?: string;
  [key: string]: any;
}

export interface AuthCredentials {
  studentName: string;
  studentId: string;
}

export type ViewState = 'loading' | 'login' | 'result' | 'error';
