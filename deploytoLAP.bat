@echo off
set "LAP_VERSION=LAP2"
set /p LAP_VERSION=LAP VERSION:
echo %LAP_VERSION%
echo Press any key to copy to server
PAUSE
echo 10.18.200.209 - Starting
xcopy /e /y .\build\js \\10.18.200.209\www\Sparta\LAP.Site\%LAP_VERSION%\js
xcopy /e /y .\build\css \\10.18.200.209\www\Sparta\LAP.Site\%LAP_VERSION%\css
echo 10.18.200.202 - Starting
xcopy /e /y .\build\js \\10.18.200.202\www\Sparta\LAP.Site\%LAP_VERSION%\js
xcopy /e /y .\build\css \\10.18.200.202\www\Sparta\LAP.Site\%LAP_VERSION%\css
PAUSE