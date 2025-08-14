# AICOP Full Stack Setup Guide

This guide will help you set up both the Django backend and React frontend for the AICOP platform.

## Prerequisites

- Python 3.10+
- Node.js 16+
- npm or yarn
- Git

## Backend Setup (Django + Django Ninja)

### 1. Navigate to the app directory
```bash
cd app
```

### 2. Create and activate virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 4. Run database migrations
```bash
python manage.py migrate
```

### 5. Start the Django development server
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## Frontend Setup (React)

### 1. Navigate to the frontend directory
```bash
cd frontend
```

### 2. Install Node.js dependencies
```bash
npm install
```

### 3. Start the React development server
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Verification

1. **Backend Health Check**: Visit `http://localhost:8000/api/health`
2. **Frontend**: Visit `http://localhost:3000`
3. **API Documentation**: Visit `http://localhost:8000/api/docs`

## Usage

1. Open the frontend at `http://localhost:3000`
2. Click "Generate Code" in the navigation
3. Fill in your project requirements
4. Specify module name and class name
5. Click "Generate Code" and wait for results
6. Copy or download the generated code

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure:
- Django backend is running on port 8000
- Frontend is running on port 3000
- `django-cors-headers` is installed

### CSS Warnings
The `@tailwind` warnings in VS Code are normal and can be ignored. They'll work fine once dependencies are installed.

### API Connection Issues
- Check that both servers are running
- Verify the API URL in `frontend/.env`
- Check browser console for detailed error messages

## Development Tips

- Use the Django admin at `http://localhost:8000/admin/` for backend management
- Check the browser's Network tab to debug API calls
- Generated code is stored in the `app/output/` directory
- Use the Django Ninja docs at `/api/docs` for API testing

## Production Deployment

For production deployment:
1. Set `DEBUG = False` in Django settings
2. Configure proper CORS origins
3. Use a production WSGI server like Gunicorn
4. Build the React app with `npm run build`
5. Serve static files properly