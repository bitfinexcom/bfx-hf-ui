@echo off

if exist %CD%\build (
    del /s /f /q %CD%\build
    rd /s /q .\build
)

mkdir build
move %CD%\bfx-hf-ui-core\build %CD%\build
robocopy %CD%\public %CD%\build /e

exit /b 0
