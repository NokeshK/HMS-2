#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Deploying HMS Application to Kubernetes ===${NC}\n"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}kubectl is not installed. Please install kubectl first.${NC}"
    exit 1
fi

# Check if we can connect to cluster
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Cannot connect to Kubernetes cluster. Please check your kubeconfig.${NC}"
    exit 1
fi

echo -e "${GREEN}Creating namespace...${NC}"
kubectl create namespace hms --dry-run=client -o yaml | kubectl apply -f -

echo -e "${GREEN}Applying ConfigMap...${NC}"
kubectl apply -f k8s/configmap.yaml -n hms

echo -e "${GREEN}Applying Secrets...${NC}"
kubectl apply -f k8s/secrets.yaml -n hms

echo -e "${GREEN}Deploying MySQL...${NC}"
kubectl apply -f k8s/mysql-deployment.yaml -n hms

echo -e "${YELLOW}Waiting for MySQL to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=mysql -n hms --timeout=300s

echo -e "${GREEN}Deploying Backend...${NC}"
kubectl apply -f k8s/backend-deployment.yaml -n hms

echo -e "${GREEN}Deploying Frontend...${NC}"
kubectl apply -f k8s/frontend-deployment.yaml -n hms

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}\n"

echo -e "${BLUE}Checking pod status...${NC}"
kubectl get pods -n hms

echo -e "\n${BLUE}Checking services...${NC}"
kubectl get services -n hms

echo -e "\n${YELLOW}To get the frontend LoadBalancer IP, run:${NC}"
echo -e "kubectl get service hms-frontend-service -n hms"

echo -e "\n${YELLOW}To view logs, run:${NC}"
echo -e "kubectl logs -f deployment/hms-backend -n hms"
echo -e "kubectl logs -f deployment/hms-frontend -n hms"



