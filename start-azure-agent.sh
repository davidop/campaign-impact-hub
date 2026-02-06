#!/bin/bash

# Start Azure AI Agent Integration
# This script starts both the Python backend and the frontend development server

echo "🚀 Starting Campaign Impact Hub with Azure AI Agent Integration"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 and try again."
    exit 1
fi

# Check if dependencies are installed
if ! python3 -c "import flask" &> /dev/null; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
    echo ""
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Creating template..."
    cat > .env << EOF
# Azure AI Agent Configuration
AZURE_AIPROJECT_ENDPOINT=https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter
AZURE_AGENT_ID=asst_nJy3ICZrtfnUcpcldqpiEBTQ
AZURE_AGENT_PORT=5001

# Frontend Configuration
VITE_USE_AZURE_AGENT=true
VITE_AZURE_AGENT_BACKEND=http://localhost:5001
EOF
    echo "✅ Created .env file. Please configure your Azure credentials."
    echo ""
fi

# Check Azure authentication
echo "🔐 Checking Azure authentication..."
if az account show &> /dev/null; then
    echo "✅ Azure CLI authenticated"
    ACCOUNT=$(az account show --query name -o tsv)
    echo "   Using account: $ACCOUNT"
else
    echo "⚠️  Azure CLI not authenticated. Run 'az login' or set environment variables."
    echo "   The server will start but Azure features may not work."
fi
echo ""

# Start Python backend in background
echo "🐍 Starting Python backend on port 5001..."
python3 azure_agent_server.py &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
echo ""

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Backend is running"
else
    echo "⚠️  Backend may not be running properly"
fi
echo ""

# Start frontend
echo "⚛️  Starting frontend development server..."
echo ""
npm run dev

# Cleanup on exit
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM

wait
