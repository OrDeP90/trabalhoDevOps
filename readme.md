@"
# Cadastro de Doadores - Kubernetes

## 🚀 RESUMO de como Executar
Para rodar o projeto, basta executar o arquivo "deploy.ps1", ou executar seus comandos individualmente. 

O projeto para ver o funcionamento do projeto, pode-se abrir a url k8s.local, a qual faz a renderização visual do projeto. É possível que haja uma falha na comunicação por conta do ingress (reparação ainda não solucionada).

Outra possibilidade, é rodar utilizando kubectl port-forward svc/frontend 8080:80, após a execução do script de deploy. Assim, ao abrir na url localhost:8080, há a aplicação 100% funcional.



# README - Sistema de Cadastro de Doadores no Kubernetes (Minikube)

## Visão Geral do Projeto

Este projeto implementa um sistema de cadastro de doadores utilizando uma arquitetura de microsserviços containerizados e implantados no Kubernetes (Minikube). A aplicação consiste em:

- **Frontend**: Aplicação web desenvolvida em React
- **Backend**: API REST desenvolvida em Node.js
- **Banco de Dados**: MySQL para armazenamento persistente

## Estrutura do Projeto

```
cadastro-doadores/
├── src/
│   ├── Backend/          # Código fonte do backend
│   ├── Frontend/         # Código fonte do frontend
├── helm-chart/           # Configurações do Helm Chart
│   ├── templates/        # Templates Kubernetes
│   ├── Chart.yaml        # Metadados do Chart
│   ├── values.yaml       # Valores de configuração
│   └── db-init/          # Scripts de inicialização do DB
├── docker-compose.yml    # Configuração para Docker Compose
├── deploy.ps1           # Script de implantação
└── README.md            # Documentação do projeto
```

## Componentes Kubernetes

### 1. Backend

**Deployment**:
- Imagem: `doadores-backend:latest`
- Porta: 5000
- Variáveis de ambiente:
  - `DB_HOST`: mysql
  - `DB_USER`: Obtido do Secret
  - `DB_PASS`: Obtido do Secret
  - `DB_NAME`: cadastro_doadores
- Probes configurados (liveness, readiness, startup)
- Limites de recursos: 500m CPU, 512Mi memória

**Service**:
- Tipo: ClusterIP
- Expõe a porta 5000 internamente no cluster

### 2. Frontend

**Deployment**:
- Imagem: `doadores-frontend:latest`
- Porta: 80
- Variável de ambiente:
  - `API_BASE_URL`: http://backend:5000
- Probes configurados

**Service**:
- Tipo: ClusterIP
- Expõe a porta 80 internamente no cluster

### 3. Banco de Dados MySQL

**Deployment**:
- Imagem: `mysql:5.7`
- Porta: 3306
- Volume para inicialização do banco via ConfigMap
- Variáveis de ambiente:
  - `MYSQL_ROOT_PASSWORD`: root
  - `MYSQL_DATABASE`: cadastro_doadores

**Service**:
- Tipo: ClusterIP
- Expõe a porta 3306 internamente no cluster

### 4. Ingress

- Habilita acesso externo à aplicação
- Configurado para o host `k8s.local`
- Roteia tráfego para o serviço do frontend

## Configuração do Helm Chart

O projeto utiliza Helm para gerenciamento de pacotes Kubernetes. O arquivo `values.yaml` contém todas as configurações personalizáveis:

- Contagem de réplicas
- Configurações de imagem para cada componente
- Recursos alocados (CPU/memória)
- Configurações de probes
- Configurações do MySQL
- Configurações de Ingress

## Implantação Local com Minikube

### Pré-requisitos

- Minikube instalado
- Docker
- Helm
- PowerShell 5.1+

### Passos para Implantação

1. Execute o script `deploy.ps1` que realizará automaticamente:
   - Inicia o Minikube
   - Configura o ambiente Docker
   - Constrói as imagens
   - Cria o ConfigMap para inicialização do MySQL
   - Habilita o Ingress no Minikube
   - Instala o Helm Chart

2. Acesse a aplicação:
   - Via port-forward: `kubectl port-forward svc/frontend 8080:80` e acesse http://localhost:8080
   - Ou via Ingress: Adicione `k8s.local` ao seu arquivo hosts apontando para o IP do Minikube e acesse http://k8s.local

## Solução de Problemas

1. **Falha em requisições ao backend**:
   - Verifique se o serviço do backend está rodando: `kubectl get pods`
   - Verifique os logs do backend: `kubectl logs <nome-do-pod-backend>`
   - Verifique a conexão com o MySQL: `kubectl exec -it <nome-do-pod-mysql> -- mysql -u root -p`

2. **Problemas com Ingress**:
   - Verifique se o addon de Ingress está habilitado: `minikube addons list`
   - Verifique os pods do Ingress: `kubectl get pods -n ingress-nginx`

## Melhorias Futuras

- Implementar persistência de dados para o MySQL
- Adicionar autenticação/autorização
- Configurar CI/CD para builds automatizados
- Implementar monitoramento com Prometheus/Grafana
- Adicionar mecanismos de logging centralizado

## Observações

Este projeto foi configurado para ambiente de desenvolvimento local usando Minikube. Para ambientes de produção, recomenda-se:

- Utilizar um registry de imagens (Docker Hub, ECR, GCR)
- Configurar secrets adequadamente
- Habilitar persistência de dados
- Configurar recursos adequados para cada componente
- Implementar políticas de rede e segurança