@echo off
title Nemo Docker Swimmer

color 02
echo.
echo -------------------------------
echo.                              
echo          NEMO Swimmer      
echo.
echo -------------------------------
echo.
echo  just keep swimming...  
echo                 _
echo           .-*'`    `*-.._.-'/
echo  "nemo  < * ))     ,       ( "
echo           `*-._`._(__.--*"`.\
echo.

if EXIST "C:\Program Files\Docker\" (
    echo.
    echo Docker is installed correctly
    echo.
) Else ( 
    echo.
    echo Oh no! Docker is not installed...
    echo Link opening to Install docker !
    timeout -t 3
    start https://docs.docker.com/desktop/install/windows-install/
    goto END
)

timeout -t 5
GOTO PROMPT



:PROMPT
SET nemofirst=
SET /P nemofirst=Is this your first time using Nemo Swimmer(Y/[N])?
IF '%nemofirst%'=='Y' GOTO FIRSTRUN
IF '%nemofirst%'=='y' GOTO FIRSTRUN
IF '%nemofirst%'=='N' GOTO NOTRUN
IF '%nemofirst%'=='n' GOTO NOTRUN
GOTO END

:FIRSTRUN
echo.
echo First Swim!

docker run -d -v nemo-db:/var/lib/postgresql/data -e POSTGRES_USER=odoo -e POSTGRES_PASSWORD=odoo -e POSTGRES_DB=postgres --name db postgres:latest

echo.
echo.
echo Time to initalize a database! When you press enter a webpage will pop up prompting you to create a database
PAUSE
start http://localhost:8069/web/database/selector
echo After completing this step run this file again to swim with Nemo! 
GOTO END

:NOTRUN
echo.
timeout -t 3

docker run -v main-nemo:/var/lib/odoo -d -p 8069:8069 --name main-nemo --link db:db -t soupseeker/nemo:main -i nemo_pos, --init nemo_pos
GOTO END

:END
echo.
echo.
echo.
echo Requests fulfilled!
echo.
echo Keep Swimming!
PAUSE
EXIT