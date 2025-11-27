# Quick Ansible Deployment Guide

## ✅ Status

**Docker Images**: Successfully built and pushed! ✅
- `nokesh14/hms-backend:latest`
- `nokesh14/hms-frontend:latest`

## 🚀 Deployment Options

### Option 1: Use Existing Deployment Script (Recommended)
```bash
cd ..
./deploy-k8s.sh
```

### Option 2: Use kubectl Directly
```bash
cd ..
kubectl apply -f k8s/configmap.yaml -n hms
kubectl apply -f k8s/secrets.yaml -n hms
kubectl apply -f k8s/mysql-deployment.yaml -n hms
kubectl apply -f k8s/backend-deployment.yaml -n hms
kubectl apply -f k8s/frontend-deployment.yaml -n hms
```

### Option 3: Install Kubernetes Python Library (For Full Ansible)
```bash
pip3 install kubernetes
cd ansible
ansible-playbook playbooks/deploy-k8s.yml
```

## 📝 What Was Completed

✅ **Build and Push Playbook**: Working perfectly!
- Builds backend Docker image
- Builds frontend Docker image  
- Pushes both to Docker Hub

## 🔧 Fix Kubernetes Deployment

The Kubernetes deployment requires the `kubernetes` Python library. You have two options:

### Quick Fix: Install Library
```bash
pip3 install kubernetes
```

### Alternative: Use kubectl Commands
The playbook can be updated to use `kubectl` commands instead of the Kubernetes module.

## ✅ Current Status

- ✅ Ansible installed and working
- ✅ Docker images built and pushed
- ⚠️ Kubernetes deployment needs Python library or kubectl commands

## 🎯 Next Steps

1. **Deploy using existing script** (easiest):
   ```bash
   cd ..
   ./deploy-k8s.sh
   ```

2. **Or install library and continue with Ansible**:
   ```bash
   pip3 install kubernetes
   cd ansible
   ansible-playbook playbooks/deploy-k8s.yml
   ```

