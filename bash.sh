#!/bin/bash
echo -e "\e[38;2;255;165;0m"
cat << "EOF"
 -------------------------------
             
         NEMO Swimmer      

 -------------------------------

  just keep swimming...  
_      _      _      _      _      _      _      _
)`'-.,_)`'-.,_)`'-.,_)`'-.,_)`'-.,_)`'-.,_)`'-.,_)`'-.,_
_     _     _     _     _     _     _     _
)`'-.,)`'-.,)`'-.,)`'-.,)`'-.,)`'-.,)`'-.,)`'-.,
                 _
           .-*'`    `*-.._.-'/
     ...  < * ))     ,       ( "
           `*-._`._(__.--*"`.\
_    _    _    _    _    _    _    _    _
)'-.,)'-.,)'-.,)'-.,)'-.,)'-.,)'-.,)'-.,)'-.,
 _       _      _       _      _      _
( `'-.,_( `'-.,( `'-.,_( `'-._( `'-.,( `'-.,
 -------------------------------
EOF
echo -e "\e[0m"
# check if docker is installed
if ! [ -x "$(command -v docker)" ]; then
  # install docker
  echo "Nemo requires docker"
  curl -fsSL https://get.docker.com | sh
fi

#check if docker is running
if sc query "Docker Engine" | grep "RUNNING" > /dev/null; then
  echo "Docker is running"
else
  echo "Starting docker... one moment"
  C:/Program\ Files/Docker/Docker/Docker\ Desktop.exe &
  sleep 10
fi

# check if the docker containers are already running
if docker ps -a | grep -q nemo
then
  # stop the nemo container
  docker stop nemo

  if docker ps -a | grep db
  then
  # stop the nemo-db container
  docker stop db
  docker rm nemo
  docker rm db
  fi
fi

# prompt the user for input for the image tags
read -p "Enter the image tag for the soupseeker/nemo:main image (e.g., latest, main, dev, etc.): " nemo_tag
read -p "Enter the image tag for the postgres:13.0 image (e.g., latest, 13.0, 13.1, etc.): " postgres_tag

# pull the specified images
echo "Grabbing the images for you, please be patient"
docker pull soupseeker/nemo:$nemo_tag
docker pull postgres:$postgres_tag

# ask the user if they want to start the program
read -p "Would you like to start the program (y/n)? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # run the specified Docker commands
  docker run -d -v db:/var/lib/postgresql/data -e POSTGRES_USER=odoo -e POSTGRES_PASSWORD=odoo -e POSTGRES_DB=postgres --name db postgres:$postgres_tag
  docker run -v nemo:/var/lib/odoo -d -p 8069:8069 --name nemo --link db:db -t soupseeker/nemo:$nemo_tag -i nemo_pos, --init nemo_pos
  echo "Give the server a moment to boot"
  # print the message "Server booting"
  echo "Server booting in 10..."
  sleep 10
  
  # open the webpage "localhost:8069" in the default web browser
  start "http://localhost:8069"  
fi
