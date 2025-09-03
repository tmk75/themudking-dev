# TA Reporting System - Portable Package

## What's Included
This package contains a complete TA (Teaching Assistant) Reporting System built with Vue.js.

## Files Structure
```
TA-Reporting-System/
├── dist/                    # Built application (ready to run)
├── src/                     # Source code
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
├── vite.config.js          # Build configuration
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── *.csv                   # Data files
└── package-instructions.md  # This file
```

## How to Run

### Option 1: Run the Built Version (Recommended)
1. Open the `dist/index.html` file in any modern web browser
2. The application will run directly without needing a server

### Option 2: Development Mode
1. Install Node.js (if not already installed)
2. Open terminal/command prompt in the project folder
3. Run: `npm install` (installs dependencies)
4. Run: `npm run dev` (starts development server)
5. Open browser to the URL shown (usually http://localhost:5173)

### Option 3: Preview Built Version
1. Install Node.js (if not already installed)
2. Open terminal/command prompt in the project folder
3. Run: `npm install` (installs dependencies)
4. Run: `npm run preview` (serves the built version)
5. Open browser to the URL shown

## Features
- Kanban board for recruitment tracking
- Dashboard with metrics and analytics
- Pipeline health monitoring
- Risk indicators
- Multiple team views (Engineering, Marketing, Sales, etc.)
- Data import/export capabilities

## System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- For development: Node.js 16+ and npm

## Data Files
The system includes sample CSV files:
- `TA_Reporting_Data_Entry.csv` - Main data entries
- `Stage_History_Data.csv` - Historical stage data
- `WIP_Limits_Config.csv` - Work-in-progress limits configuration

## Customization
- Edit files in the `src/` directory to modify functionality
- Run `npm run build` to rebuild after changes
- CSS styles can be found in `src/style.css` and component files

## Support
This is a standalone application that can be copied and run on any system with the requirements above.