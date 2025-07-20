# Dockerfile
FROM node:18

# Instala o cliente MySQL e dependências do sistema
RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Primeiro copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Variáveis de ambiente (opcional)
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]