echo "Running Installation of Node Modules and Running App..."
cmd /C "cd client & npm i & cd .."
cmd /C "cd server & npm i & cd .."
run.bat
cmd /k