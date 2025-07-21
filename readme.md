@"
# Cadastro de Doadores - Kubernetes

## 🚀 RESUMO de como Executar
Para rodar o projeto, basta executar o arquivo "deploy.ps1", ou executar seus comandos individualmente. 

O projeto para ver o funcionamento do projeto, pode-se abrir a url k8s.local, a qual faz a renderização visual do projeto. É possível que haja uma falha na comunicação por conta do ingress (reparação ainda não solucionada).

Outra possibilidade, é rodar utilizando kubectl port-forward svc/frontend 8080:80, após a execução do script de deploy. Assim, ao abrir na url localhost:8080, há a aplicação 100% funcional.


Com base nas informações e arquivos YAML fornecidos, aqui está um exemplo completo de **README para PDF** do seu projeto de Kubernetes com Minikube, descrevendo a aplicação, os componentes, containers e os artefatos do Kubernetes utilizados:

---

## 📘 **Projeto DevOps - Cadastro de Doadores de Sangue com Kubernetes (Minikube)**

### 📌 Descrição da Aplicação

A aplicação desenvolvida tem como objetivo **cadastrar doadores de sangue** por meio de uma **interface web**, com os dados persistidos em um banco de dados MySQL. O sistema foi conteinerizado e implantado em um ambiente Kubernetes local utilizando o **Minikube**, com suporte ao gerenciamento via Helm Charts.

---

### 🧩 Componentes da Aplicação

A aplicação é composta por três componentes principais, cada um executando em um contêiner diferente:

| Componente         | Função                                               | Tecnologia        |
| ------------------ | ---------------------------------------------------- | ----------------- |
| **Frontend**       | Interface web para cadastro e listagem de doadores   | React             |
| **Backend**        | API REST que recebe e processa os dados da interface | Node.js + Express |
| **Banco de Dados** | Armazena os dados dos doadores                       | MySQL 5.7         |

---

### 📦 Estrutura dos Containers

* **doadores-frontend**: executa a interface web.
* **doadores-backend**: fornece a API REST e interage com o banco de dados.
* **mysql**: instância do banco de dados MySQL, iniciada com script `init.sql`.

---

### ⚙️ Artefatos Kubernetes Utilizados

#### 🛠️ Deployment

Controlam a criação e o gerenciamento dos pods.

* **backend-deployment**: cria pods com a imagem do Node.js, configura variáveis de ambiente e probes de saúde.
* **frontend-deployment**: gera os pods com o React, define o `API_BASE_URL` e probes.
* **mysql-deployment**: cria o contêiner do MySQL com configuração inicial via `ConfigMap`.

#### 🌐 Service

Expõem os componentes para comunicação interna no cluster.

* **backend-service**: expõe o backend via `ClusterIP` na porta 5000.
* **frontend-service**: expõe o frontend internamente na porta 80.
* **mysql-service**: expõe o banco de dados internamente na porta 3306.

> Os serviços do tipo **ClusterIP** permitem que os pods se comuniquem entre si dentro do cluster Kubernetes, utilizando os nomes dos serviços como hostname (por exemplo, `backend`, `mysql`).

#### 🌍 Ingress

* **doadores-ingress**: configura o acesso externo à aplicação via hostname `k8s.local`. Redireciona o tráfego HTTP para o serviço `frontend`.

#### 📄 ConfigMap e Secret

* `ConfigMap`: contém o script `init.sql` para inicialização do banco.
* `Secret`: contém as credenciais de acesso ao MySQL utilizadas no backend.

---

### 📄 values.yaml (Resumo)

O arquivo `values.yaml` centraliza as configurações dos recursos como:

* Imagens e tags dos contêineres.
* Recursos solicitados e limites (CPU e memória).
* Probes de liveness, readiness e startup.
* Nome do banco, senhas, URLs e porta dos serviços.
* Habilitação e configuração do Ingress.

---

### 🚀 Como Executar o Projeto

#### Pré-requisitos:

* PowerShell 5.1+ no Windows
* Minikube instalado com driver Docker
* Docker instalado
* Helm instalado

#### Passos de Deploy:

```powershell
# 1. Iniciar o Minikube
minikube start --driver=docker

# 2. Configurar o Docker local para o Minikube
minikube docker-env

# 3. Build das imagens
docker build -t doadores-frontend ./cadastro-doadores/src/Frontend/
docker build -t doadores-backend ./cadastro-doadores/src/Backend/

# 4. Criar ConfigMap com o script SQL
kubectl create configmap mysql-init --from-file=./helm-chart/db-init/init.sql

# 5. Habilitar o Ingress Controller
minikube addons enable ingress

# 6. Instalar os recursos com Helm
helm install cadastro-doadores ./helm-chart

# 7. Redirecionar porta do frontend para localhost
kubectl port-forward svc/frontend 8080:80

# 8. Acessar no navegador
http://localhost:8080
```

> ⚠️ **Observação:** Embora a aplicação abra corretamente via Ingress em `http://k8s.local`, pode ocorrer uma falha de requisição ao backend. O acesso via `kubectl port-forward` funciona normalmente.

---

### 🗂️ Estrutura do Projeto

```bash
cadastro-doadores/
│
├── src/
│   ├── Backend/         # Código do servidor Node.js
│   └── Frontend/        # Código React da interface
│
├── helm-chart/          # Helm Chart para a aplicação
│   ├── db-init/         # Script SQL para inicializar o banco
│   ├── templates/       # Deployments, Services, Ingress
│   ├── Chart.yaml
│   └── values.yaml
│
├── docker-compose.yml   # Versão Compose para testes locais
├── deploy.ps1           # Script de deploy com PowerShell
├── package.json         # Dependências do projeto
└── README.md            # Este documento
```

