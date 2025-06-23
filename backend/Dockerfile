# Backend Dockerfile for Node.js + Express + TypeScript
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY src ./src
RUN npm install && npm run build
EXPOSE 4000
CMD ["npm", "run", "dev"]
