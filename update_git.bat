set arg1=%1
git add .
git status
PAUSE
git commit -m %arg1%
git pull
git status
PAUSE
git push
cmd /k