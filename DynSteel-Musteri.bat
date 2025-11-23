@echo off
title DynSteel E-Commerce
echo.
echo ========================================
echo   DynSteel E-Commerce Baslatiiliyor...
echo ========================================
echo.

REM Chrome ile app modunda ac
start chrome --app=http://localhost:3000 --new-window --window-size=1200,900

REM Eger Chrome yoksa Edge'i dene
if errorlevel 1 (
    start msedge --app=http://localhost:3000 --new-window --window-size=1200,900
)

echo.
echo DynSteel E-Commerce acildi!
echo Pencereyi kapatabilirsiniz.
echo.
timeout /t 3 >nul
exit

