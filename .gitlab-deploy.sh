#!/bin/bash
#Get servers list
set -f
string=$DEPLOY_SERVER
array=(${string//,/ })
#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do
      echo "Deploy project on server ${array[i]}"
      ssh ubuntu@${array[i]} "sudo su && cd fileupload  && sudo git pull "https://PySlim:"$SSH_PRIVATE_PASS"@gitlab.com/PySlim/fileupload.git"  main && sudo docker compose -f develop.yml down && sudo docker compose -f develop.yml up -d"
done
