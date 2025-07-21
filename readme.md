@"
# Cadastro de Doadores - Kubernetes

## 🚀 Como Executar
Para rodar o projeto, basta executar o arquivo "deploy.ps1", ou executar seus comandos individualmente. 

O projeto para ver o funcionamento do projeto, pode-se abrir a url k8s.local, a qual faz a renderização visual do projeto. É possível que haja uma falha na comunicação por conta do ingress (reparação ainda não solucionada).

Outra possibilidade, é rodar utilizando kubectl port-forward svc/frontend 8080:80, após a execução do script de deploy. Assim, ao abrir na url localhost:8080, há a aplicação 100% funcional.