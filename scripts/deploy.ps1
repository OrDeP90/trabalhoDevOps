# Requer PowerShell 5.1+
Write-Host "ðŸš€ Iniciando deploy..." -ForegroundColor Cyan

# 1. Inicia o Minikube
minikube start --driver=docker

# 2. Configura o ambiente Docker
minikube docker-env

# 3. ConstrÃ³i as imagens
docker build -t doadores-frontend ./cadastro-doadores/src/Frontend/
docker build -t doadores-backend ./cadastro-doadores/src/Backend/
kubectl create configmap mysql-init --from-file=./helm-chart/db-init/init.sql

# 4. Aplica as configuraÃ§Ãµes Kubernetes
helm install cadastro-doadores ./helm-chart

minikube addons enable ingress

Write-Host "âœ… Deploy concluÃ­do! Acesse:" -ForegroundColor Green
minikube service list
