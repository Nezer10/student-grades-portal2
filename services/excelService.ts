
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs';
import { StudentRecord } from '../types';

/**
 * In a real Next.js environment, you would place grades.xlsx in the public folder.
 * This service attempts to fetch 'grades.xlsx' and parse it.
 * It also provides fallback mock data if the file is missing for demonstration.
 */

const MOCK_DATA: StudentRecord[] = [
  { "Student ID": "S1001", "Student Name": "Alex Johnson", "Course": "Advanced Mathematics", "Grade": "A", "Semester": "Fall 2023", "Status": "Passed" },
  { "Student ID": "S1002", "Student Name": "Sarah Miller", "Course": "Computer Science 101", "Grade": "B+", "Semester": "Fall 2023", "Status": "Passed" },
  { "Student ID": "S1003", "Student Name": "Michael Chen", "Course": "Physics II", "Grade": "A-", "Semester": "Fall 2023", "Status": "Passed" },
  { "Student ID": "S1004", "Student Name": "Emily Davis", "Course": "Macroeconomics", "Grade": "B", "Semester": "Fall 2023", "Status": "Passed" }
];

export const fetchGradesFromExcel = async (url: string = '/grades.xlsx'): Promise<StudentRecord[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Excel file not found at ${url}. Using mock data for demonstration.`);
      return MOCK_DATA;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Assume data is in the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json<StudentRecord>(worksheet);
    return jsonData;
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    return MOCK_DATA;
  }
};
