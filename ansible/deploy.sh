#!/bin/bash

# HMS Application Deployment Script using Ansible
# This script automates the complete deployment process

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}=== HMS Application Deployment with Ansible ===${NC}\n"

# Check if Ansible is installed
if ! command -v ansible-playbook &> /dev/null; then
    echo -e "${RED}Ansible is not installed.${NC}"
    echo -e "${YELLOW}Installing Ansible...${NC}"
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install ansible
        else
            echo -e "${RED}Please install Homebrew first: https://brew.sh${NC}"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y ansible
    else
        echo -e "${RED}Please install Ansible manually: https://docs.ansible.com${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Ansible is installed${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}kubectl is not installed. Please install kubectl first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ kubectl is installed${NC}"

# Check Docker login
if ! docker info &> /dev/null; then
    echo -e "${YELLOW}Warning: Docker might not be running or you're not logged in.${NC}"
    echo -e "${YELLOW}Please run: docker login${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check Kubernetes cluster
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Cannot connect to Kubernetes cluster.${NC}"
    echo -e "${YELLOW}Please check your kubeconfig.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Kubernetes cluster is accessible${NC}\n"

# Install Ansible collections
echo -e "${BLUE}Installing Ansible collections...${NC}"
ansible-galaxy collection install -r requirements.yml --force

echo -e "\n${BLUE}Starting deployment...${NC}\n"

# Run the main playbook
ansible-playbook playbooks/main.yml "$@"

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}=== Deployment Successful! ===${NC}\n"
    echo -e "${YELLOW}Next steps:${NC}"
    echo -e "1. Set up port forwarding:"
    echo -e "   ${BLUE}kubectl port-forward service/hms-frontend-service 3000:80 -n hms &${NC}"
    echo -e "   ${BLUE}kubectl port-forward service/hms-backend-service 8081:8081 -n hms &${NC}"
    echo -e "\n2. Access the application:"
    echo -e "   ${BLUE}Frontend: http://localhost:3000${NC}"
    echo -e "   ${BLUE}Backend: http://localhost:8081${NC}"
else
    echo -e "\n${RED}=== Deployment Failed! ===${NC}"
    echo -e "${YELLOW}Check the error messages above for details.${NC}"
    exit 1
fi


