@echo off
title DynSteel Admin Panel
echo.
echo ========================================
echo   DynSteel Admin Panel Baslatiiliyor...
echo ========================================
echo.

REM Chrome ile app modunda ac
start chrome --app=http://localhost:3000/admin --new-window --window-size=1400,900

REM Eger Chrome yoksa Edge'i dene
if errorlevel 1 (
    start msedge --app=http://localhost:3000/admin --new-window --window-size=1400,900
)

echo.
echo Admin Panel acildi!
echo Pencereyi kapatabilirsiniz.
echo.
timeout /t 3 >nul
exit
