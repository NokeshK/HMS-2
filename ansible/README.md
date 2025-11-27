# Ansible Deployment Guide for HMS Application

This directory contains Ansible playbooks to automate the deployment of the HMS (Hospital Management System) full stack application.

## Prerequisites

### 1. Install Ansible
```bash
# macOS
brew install ansible

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y ansible

# Using pip
pip3 install ansible
```

### 2. Install Required Ansible Collections
```bash
cd ansible
ansible-galaxy collection install -r requirements.yml
```

### 3. Required Tools
- **Docker**: Installed and running
- **kubectl**: Installed and configured
- **Kubernetes Cluster**: Accessible (minikube, kind, or cloud cluster)
- **Docker Hub Account**: Logged in (`docker login`)

## Quick Start

### Complete Deployment (Build + Deploy)
```bash
cd ansible
ansible-playbook playbooks/main.yml
```

### Build and Push Images Only
```bash
ansible-playbook playbooks/build-and-push.yml
```

### Deploy to Kubernetes Only
```bash
ansible-playbook playbooks/deploy-k8s.yml
```

## Configuration

### Variables

Edit `playbooks/main.yml` or use `-e` flag to override variables:

```bash
# Custom Docker username
ansible-playbook playbooks/main.yml -e "docker_username=yourusername"

# Skip build step
ansible-playbook playbooks/main.yml -e "skip_build=true"

# Skip deployment step
ansible-playbook playbooks/main.yml -e "skip_deploy=true"
```

### Available Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `docker_username` | `nokesh14` | Docker Hub username |
| `namespace` | `hms` | Kubernetes namespace |
| `skip_build` | `false` | Skip Docker build and push |
| `skip_deploy` | `false` | Skip Kubernetes deployment |

## Playbook Structure

```
ansible/
├── playbooks/
│   ├── main.yml              # Main playbook (runs all)
│   ├── build-and-push.yml     # Build and push Docker images
│   └── deploy-k8s.yml         # Deploy to Kubernetes
├── inventory/
│   └── hosts                  # Inventory file
├── requirements.yml           # Ansible collection requirements
├── ansible.cfg                # Ansible configuration
└── README.md                  # This file
```

## Detailed Usage

### 1. Build and Push Docker Images

```bash
ansible-playbook playbooks/build-and-push.yml
```

This playbook will:
- Check if Docker is installed
- Build backend Docker image
- Build frontend Docker image
- Push both images to Docker Hub

### 2. Deploy to Kubernetes

```bash
ansible-playbook playbooks/deploy-k8s.yml
```

This playbook will:
- Check if kubectl is installed
- Verify Kubernetes cluster connectivity
- Create namespace
- Create ConfigMap and Secrets
- Deploy MySQL with persistent storage
- Deploy Backend service
- Deploy Frontend service
- Wait for all services to be ready

### 3. Complete Deployment

```bash
ansible-playbook playbooks/main.yml
```

Runs both build and deploy playbooks in sequence.

## Advanced Usage

### Custom Docker Username

```bash
ansible-playbook playbooks/main.yml -e "docker_username=yourusername"
```

### Deploy to Different Namespace

```bash
ansible-playbook playbooks/deploy-k8s.yml -e "namespace=production"
```

### Verbose Output

```bash
ansible-playbook playbooks/main.yml -v    # Verbose
ansible-playbook playbooks/main.yml -vv   # More verbose
ansible-playbook playbooks/main.yml -vvv  # Debug mode
```

### Check Mode (Dry Run)

```bash
ansible-playbook playbooks/deploy-k8s.yml --check
```

### Limit to Specific Tasks

```bash
# Only create namespace
ansible-playbook playbooks/deploy-k8s.yml --tags namespace

# Only deploy backend
ansible-playbook playbooks/deploy-k8s.yml --tags backend
```

## Troubleshooting

### Docker Not Found
```bash
# Check Docker installation
docker --version

# Make sure Docker is running
docker ps
```

### kubectl Not Found
```bash
# Install kubectl
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### Kubernetes Cluster Not Accessible
```bash
# Check cluster connection
kubectl cluster-info

# Check current context
kubectl config current-context

# List available contexts
kubectl config get-contexts
```

### Ansible Collection Missing
```bash
# Install collections
ansible-galaxy collection install -r requirements.yml

# Update collections
ansible-galaxy collection install -r requirements.yml --upgrade
```

### Docker Login Required
```bash
# Login to Docker Hub
docker login

# Or use environment variable
export DOCKER_USERNAME=yourusername
export DOCKER_PASSWORD=yourpassword
```

## Post-Deployment

After successful deployment:

### 1. Set Up Port Forwarding
```bash
# Frontend
kubectl port-forward service/hms-frontend-service 3000:80 -n hms &

# Backend
kubectl port-forward service/hms-backend-service 8081:8081 -n hms &
```

### 2. Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8081

### 3. Check Status
```bash
# Check pods
kubectl get pods -n hms

# Check services
kubectl get services -n hms

# View logs
kubectl logs -f deployment/hms-frontend -n hms
kubectl logs -f deployment/hms-backend -n hms
```

## Cleanup

### Remove Deployment
```bash
kubectl delete namespace hms
```

### Remove Docker Images (Local)
```bash
docker rmi nokesh14/hms-backend:latest
docker rmi nokesh14/hms-frontend:latest
```

## Best Practices

1. **Use Tags**: Organize tasks with tags for selective execution
2. **Idempotency**: Playbooks are idempotent - safe to run multiple times
3. **Variables**: Use variables for configuration instead of hardcoding
4. **Secrets**: Store secrets in Kubernetes Secrets, not in playbooks
5. **Testing**: Test playbooks in a development environment first

## Example Workflow

```bash
# 1. Install Ansible and collections
pip3 install ansible
cd ansible
ansible-galaxy collection install -r requirements.yml

# 2. Login to Docker Hub
docker login

# 3. Verify Kubernetes access
kubectl cluster-info

# 4. Run complete deployment
ansible-playbook playbooks/main.yml

# 5. Set up port forwarding
kubectl port-forward service/hms-frontend-service 3000:80 -n hms &
kubectl port-forward service/hms-backend-service 8081:8081 -n hms &

# 6. Access application
open http://localhost:3000
```

## Support

For issues or questions:
- Check Kubernetes logs: `kubectl logs -f deployment/<name> -n hms`
- Check Ansible verbose output: `ansible-playbook playbooks/main.yml -vvv`
- Review playbook tasks for specific error messages

