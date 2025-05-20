@echo off
setlocal enabledelayedexpansion

mkdir guides 2>nul

set "html_template=<!DOCTYPE html><html><head><title>Guide</title></head><body><h1>Default Content</h1></body></html>"

:: Список файлов для создания
set "files[0]=localization.html"
set "files[1]=controls.html"
set "files[2]=natives-capture.html"
set "files[3]=stats.html"
set "files[4]=relationships.html"
set "files[5]=resources.html"
set "files[6]=fishing.html"
set "files[7]=farming.html"
set "files[8]=livestock.html"
set "files[9]=natives-work.html"
set "files[10]=raids.html"
set "files[11]=pregnancy.html"
set "files[12]=ruins.html"
set "files[13]=abyss.html"
set "files[14]=secrets.html"
set "files[15]=item-ids.html"

for /l %%i in (0,1,15) do (
    echo !html_template! > "guides\!files[%%i]!"
    echo Created: guides\!files[%%i]!
)

echo All files created in 'guides' folder
pause