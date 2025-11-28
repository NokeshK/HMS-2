# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying the HMS (Hospital Management System) application.

## Prerequisites

1. Docker installed and running
2. Kubernetes cluster (local with minikube/kind or cloud-based)
3. kubectl configured to connect to your cluster
4. Docker Hub account (username: nokesh14)

## Quick Start

### 1. Build and Push Docker Images

```bash
# Make the script executable
chmod +x build-and-push.sh

# Build and push images to Docker Hub
./build-and-push.sh
```

This will:
- Build the backend Docker image
- Build the frontend Docker image
- Push both images to Docker Hub under `nokesh14/hms-backend:latest` and `nokesh14/hms-frontend:latest`

### 2. Deploy to Kubernetes

```bash
# Make the script executable
chmod +x deploy-k8s.sh

# Deploy all components
./deploy-k8s.sh
```

This will:
- Create a namespace called `hms`
- Deploy MySQL database
- Deploy backend service
- Deploy frontend service
- Create necessary ConfigMaps and Secrets

## Manual Deployment Steps

If you prefer to deploy manually:

```bash
# Create namespace
kubectl create namespace hms

# Apply ConfigMap
kubectl apply -f k8s/configmap.yaml -n hms

# Apply Secrets
kubectl apply -f k8s/secrets.yaml -n hms

# Deploy MySQL
kubectl apply -f k8s/mysql-deployment.yaml -n hms

# Wait for MySQL to be ready
kubectl wait --for=condition=ready pod -l app=mysql -n hms --timeout=300s

# Deploy Backend
kubectl apply -f k8s/backend-deployment.yaml -n hms

# Deploy Frontend
kubectl apply -f k8s/frontend-deployment.yaml -n hms
```

## Accessing the Application

### Get Frontend LoadBalancer IP

```bash
kubectl get service hms-frontend-service -n hms
```

The frontend will be accessible via the EXTERNAL-IP shown in the output.

### Port Forwarding (Alternative)

If using a local cluster without LoadBalancer support:

```bash
# Forward frontend port
kubectl port-forward service/hms-frontend-service 8080:80 -n hms

# Forward backend port (for direct API access)
kubectl port-forward service/hms-backend-service 8081:8081 -n hms
```

Then access:
- Frontend: http://localhost:8080
- Backend API: http://localhost:8081

## Monitoring

### View Pods

```bash
kubectl get pods -n hms
```

### View Logs

```bash
# Backend logs
kubectl logs -f deployment/hms-backend -n hms

# Frontend logs
kubectl logs -f deployment/hms-frontend -n hms

# MySQL logs
kubectl logs -f deployment/mysql -n hms
```

### View Services

```bash
kubectl get services -n hms
```

## Configuration

### Update Secrets

Edit `k8s/secrets.yaml` and apply:

```bash
kubectl apply -f k8s/secrets.yaml -n hms
```

### Update ConfigMap

Edit `k8s/configmap.yaml` and apply:

```bash
kubectl apply -f k8s/configmap.yaml -n hms
```

## Troubleshooting

### Check Pod Status

```bash
kubectl describe pod <pod-name> -n hms
```

### Restart Deployments

```bash
kubectl rollout restart deployment/hms-backend -n hms
kubectl rollout restart deployment/hms-frontend -n hms
```

### Delete and Redeploy

```bash
kubectl delete namespace hms
./deploy-k8s.sh
```

## Files Structure

- `backend-deployment.yaml` - Backend deployment and service
- `frontend-deployment.yaml` - Frontend deployment and service
- `mysql-deployment.yaml` - MySQL database deployment, service, and PVC
- `configmap.yaml` - Configuration values
- `secrets.yaml` - Sensitive data (passwords, secrets)

## Notes

- The frontend service uses LoadBalancer type. In local clusters, you may need to use NodePort or port-forwarding.
- MySQL data is persisted using a PersistentVolumeClaim (5Gi).
- Backend and frontend are configured with 2 replicas each for high availability.
- Health checks are configured for all services.



