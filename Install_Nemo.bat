@echo off
title Nemo Docker Installer
color 02
echo.
echo -------------------------------
echo.                              
echo          NEMO INSTALLER        
echo.
echo -------------------------------
echo.
echo  just keep swimming...  
echo                 _
echo           .-*'`    `*-.._.-'/
echo  "nemo  < * ))     ,       ( "
echo           `*-._`._(__.--*"`.\
echo.
echo Installing Dependencies...
timeout -t 5

docker pull postgres:latest
docker pull soupseeker/nemo:main