# Academic Grade Retrieval Portal

A modern, high-performance web application designed for educational institutions to provide students with a secure and intuitive interface for accessing their academic results.

## 🚀 Overview

The Grade Retrieval Portal streamlines the process of academic transcript access. Built with a focus on User Experience (UX) and security, it allows students to verify their identity and instantly view their grades fetched from a centralized database (Excel/XLSX).

## ✨ Key Features

- **Secure Authentication**: Multi-factor credential matching (Student ID + Full Name) to ensure data privacy.
- **Real-time Data Processing**: Integrated with `SheetJS` to parse institutional Excel files on-the-fly.
- **Modern UI/UX**:
  - **Dark Mode Support**: Context-aware theme switching with persistent user preferences.
  - **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
  - **Fluid Animations**: Powered by `Framer Motion` for a polished, premium feel.
- **Grade Analytics**: Visual representation of academic standing with color-coded grade badges.

## 🛠 Tech Stack

- **Frontend**: React 19 (ES6 Modules)
- **Styling**: Tailwind CSS (PostCSS)
- **Icons**: Lucide React
- **Animations**: Framer Motion 12
- **Data Parsing**: SheetJS (XLSX)
- **Typography**: Inter & Outfit (Google Fonts)

## 🏗 Architecture

### 1. Data Layer (`services/excelService.ts`)
The portal utilizes a lightweight service that fetches an Excel file (`grades.xlsx`) from the server. It leverages `XLSX.read` to convert binary data into a structured JSON format that the application can query efficiently.

### 2. State Management (`App.tsx`)
The application uses React's `useState` and `useCallback` for local state management, handling:
- Data initialization from the Excel source.
- View transitions (Loading → Login → Results).
- Authentication logic.
- Theme persistence via `localStorage`.

### 3. Component Architecture
- **LoginForm**: A robust entry point with validation logic and "shake" animations for failed attempts.
- **ResultCard**: A dynamic dashboard displaying course details, status badges, and the final grade badge with high-contrast gradients.

## 🌗 Theme Implementation

The portal implements a "Class Strategy" for dark mode.
- **Logic**: Detected via OS preference on first load, then managed via a toggle in the UI.
- **Persistence**: Choices are stored in `localStorage` to ensure a consistent experience across sessions.
- **Transitions**: CSS variables and Tailwind's `transition-colors` are used for smooth 500ms fades between themes.

## 📋 Data Schema

To populate the portal, the `grades.xlsx` file should follow this structure:

| Student ID | Student Name | Course | Grade | Semester | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| S1001 | Alex Johnson | Advanced Mathematics | A | Fall 2023 | Passed |

---

*Developed by Ahmed I. Nezer with ❤️*
