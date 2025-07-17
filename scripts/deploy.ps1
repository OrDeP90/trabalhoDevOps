@"
# Requer PowerShell 5.1+
Write-Host "🚀 Iniciando deploy..." -ForegroundColor Cyan

# 1. Inicia o Minikube
minikube start --driver=docker

# 2. Configura o ambiente Docker
minikube docker-env | Invoke-Expression

# 3. Constrói as imagens
docker build -t doadores-frontend ./frontend/
docker build -t doadores-backend ./backend/

# 4. Aplica as configurações Kubernetes
kubectl apply -f ./charts/

Write-Host "✅ Deploy concluído! Acesse:" -ForegroundColor Green
minikube service list
"@ | Out-File -FilePath scripts/deploy.ps1 -Encoding UTF8