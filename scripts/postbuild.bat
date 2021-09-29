@echo off

if exist %CD%\build (
    del /s /f /q %CD%\build
    rd /s /q .\build
)

mkdir build
robocopy %CD%\bfx-hf-ui-core\build %CD%\build /e
robocopy %CD%\public %CD%\build /e

exit /b 0
