# Requer PowerShell 5.1+
Write-Host "ðŸš€ Iniciando deploy..." -ForegroundColor Cyan

# 1. Inicia o Minikube
minikube start --driver=docker

# 2. Configura o ambiente Docker
minikube docker-env | Invoke-Expression

# 3. ConstrÃ³i as imagens
docker build -t doadores-frontend ./Frontend/
docker build -t doadores-backend ./Backend/

# 4. Aplica as configuraÃ§Ãµes Kubernetes
    kubectl apply -f ./helm-chart/

Write-Host "âœ… Deploy concluÃ­do! Acesse:" -ForegroundColor Green
minikube service list
