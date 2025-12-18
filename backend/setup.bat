@echo off
echo ========================================
echo Talabin Backend Setup Script
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/8] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo Error: Failed to create virtual environment
    pause
    exit /b 1
)

echo [2/8] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/8] Upgrading pip...
python -m pip install --upgrade pip

echo [4/8] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo [5/8] Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo .env file created. Please edit it with your settings.
) else (
    echo .env file already exists
)

echo [6/8] Running migrations...
python manage.py makemigrations
python manage.py migrate

echo [7/8] Creating superuser...
echo Please create a superuser account:
python manage.py createsuperuser

echo [8/8] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo 1. Edit the .env file with your settings
echo 2. Make sure PostgreSQL is running
echo 3. Run: python manage.py runserver
echo ========================================
echo.
pause
