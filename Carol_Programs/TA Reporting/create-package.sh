#!/bin/bash
echo "Creating TA Reporting System Package..."

# Create package directory
mkdir -p "TA-Reporting-System"

# Copy essential files
echo "Copying application files..."
cp -r "dist" "TA-Reporting-System/"
cp -r "src" "TA-Reporting-System/"
cp -r "public" "TA-Reporting-System/"

# Copy configuration files
cp "package.json" "TA-Reporting-System/"
cp "package-lock.json" "TA-Reporting-System/"
cp "vite.config.js" "TA-Reporting-System/"
cp "index.html" "TA-Reporting-System/"
cp "README.md" "TA-Reporting-System/"

# Copy data files
cp *.csv "TA-Reporting-System/" 2>/dev/null || :

# Copy instructions
cp "package-instructions.md" "TA-Reporting-System/"

echo ""
echo "Package created successfully in 'TA-Reporting-System' folder!"
echo ""
echo "To use the package:"
echo "1. Copy the 'TA-Reporting-System' folder to any computer"
echo "2. Open 'TA-Reporting-System/dist/index.html' in a web browser"
echo ""
echo "For development mode:"
echo "1. Install Node.js"
echo "2. Run 'npm install' in the TA-Reporting-System folder"
echo "3. Run 'npm run dev'"
echo ""