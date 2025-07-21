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

# 4. Enable Ingress
minikube addons enable ingress

# 5. Instalar o Helm
helm install cadastro-doadores ./helm-chart

#6.0 - Ao rodar em k8s.local, é possivel visualizar a aplicação, porém ela apresenta uma falha ao realizar uma requisição.


#6 Expor a porta do frontend
kubectl port-forward svc/frontend 8080:80

#7 Abrir no navegador a Url localhost:8080

Write-Host "âœ… Deploy concluÃ­do! Acesse:" -ForegroundColor Green
minikube service list
