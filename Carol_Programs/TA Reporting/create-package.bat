@echo off
echo Creating TA Reporting System Package...

REM Create package directory
if not exist "TA-Reporting-System" mkdir "TA-Reporting-System"

REM Copy essential files
echo Copying application files...
xcopy /E /I /Y "dist" "TA-Reporting-System\dist"
xcopy /E /I /Y "src" "TA-Reporting-System\src"
xcopy /E /I /Y "public" "TA-Reporting-System\public"

REM Copy configuration files
copy "package.json" "TA-Reporting-System\"
copy "package-lock.json" "TA-Reporting-System\"
copy "vite.config.js" "TA-Reporting-System\"
copy "index.html" "TA-Reporting-System\"
copy "README.md" "TA-Reporting-System\"

REM Copy data files
copy "*.csv" "TA-Reporting-System\"

REM Copy instructions
copy "package-instructions.md" "TA-Reporting-System\"

echo.
echo Package created successfully in 'TA-Reporting-System' folder!
echo.
echo To use the package:
echo 1. Copy the 'TA-Reporting-System' folder to any computer
echo 2. Open 'TA-Reporting-System\dist\index.html' in a web browser
echo.
echo For development mode:
echo 1. Install Node.js
echo 2. Run 'npm install' in the TA-Reporting-System folder
echo 3. Run 'npm run dev'
echo.
pause