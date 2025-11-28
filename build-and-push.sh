#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

DOCKER_USERNAME="nokesh14"

echo -e "${BLUE}=== Building and Pushing Docker Images ===${NC}\n"

# Build and push backend
echo -e "${GREEN}Building backend image...${NC}"
cd backend
docker build -t ${DOCKER_USERNAME}/hms-backend:latest .
if [ $? -ne 0 ]; then
    echo -e "${RED}Backend build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Pushing backend image...${NC}"
docker push ${DOCKER_USERNAME}/hms-backend:latest
if [ $? -ne 0 ]; then
    echo -e "${RED}Backend push failed!${NC}"
    exit 1
fi
cd ..

# Build and push frontend
echo -e "${GREEN}Building frontend image...${NC}"
cd frontend
docker build -t ${DOCKER_USERNAME}/hms-frontend:latest .
if [ $? -ne 0 ]; then
    echo -e "${RED}Frontend build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Pushing frontend image...${NC}"
docker push ${DOCKER_USERNAME}/hms-frontend:latest
if [ $? -ne 0 ]; then
    echo -e "${RED}Frontend push failed!${NC}"
    exit 1
fi
cd ..

echo -e "\n${GREEN}=== All images built and pushed successfully! ===${NC}"
echo -e "${BLUE}Backend: ${DOCKER_USERNAME}/hms-backend:latest${NC}"
echo -e "${BLUE}Frontend: ${DOCKER_USERNAME}/hms-frontend:latest${NC}"



