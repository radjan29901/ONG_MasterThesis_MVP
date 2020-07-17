docker-compose -f docker-compose-cli.yaml -f docker-compose-etcdraft2.yaml up -d
#docker-compose -f docker-compose-org3.yaml up -d
docker ps --format '{{.Names}}'
