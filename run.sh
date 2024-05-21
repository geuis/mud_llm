#!/usr/bin/env bash

# install npm dependencies
# npm install

# start api server and run app with vite in dev mode to take advantage of built in server
# (trap 'kill 0' SIGINT; node api_server.mjs & npm run dev)

# . ./image_generation_api/.venv/bin/activate
# python3 image_generation_api/api.py


#python3 -m venv .venv

source ./image_generation_api/.venv/bin/activate
pip install -r ./image_generation_api/requirements.txt

# Function to handle termination and kill child processes
cleanup() {
    echo "Terminating FastAPI server..."
    kill $FASTAPI_PID
    wait $FASTAPI_PID
    echo "FastAPI server terminated."
    exit 0
}

# Set the trap to catch termination signals (SIGINT, SIGTERM) and call the cleanup function
trap cleanup SIGINT SIGTERM

# Start the FastAPI server in the background using nohup
nohup fastapi dev ./image_generation_api/api.py > fastapi.log 2>&1 &
# nohup fastapi run ./image_generation_api/api.py > fastapi.log 2>&1 &

FASTAPI_PID=$!

# Wait for FastAPI server to be ready by monitoring the log file
echo "Waiting for FastAPI server to start..."
tail -f fastapi.log | while read LOGLINE
do
   [[ "${LOGLINE}" == *"Application startup complete."* ]] && pkill -P $$ tail
done

echo "FastAPI server started."

# Run the Node.js server in the foreground
# npm start
npm run dev

# Wait for the Node.js server process to finish
wait
