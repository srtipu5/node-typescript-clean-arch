# -------------------------------
# Price Estimator Backend - Makefile
# -------------------------------

# Variables
APP_NAME = price-estimator-backend
PORT ?= 5002
DOCKER_IMAGE = $(APP_NAME):latest
NODE_ENV ?= development
DOCKER_COMPOSE = docker-compose
ENV_FILE = .env

# Default target
.DEFAULT_GOAL := help

# -------------------------------
# Local Development Commands
# -------------------------------

## Show help (default)
help:
	@echo ""
	@echo "Price Estimator Backend Commands"
	@echo "-----------------------------------"
	@echo "make install        - Install project dependencies"
	@echo "make dev            - Run backend in dev mode (nodemon)"
	@echo "make start          - Run backend normally (production)"
	@echo "make lint           - Run ESLint"
	@echo "make build          - Format code with Prettier"
	@echo "make clean          - Remove node_modules and lock file"
	@echo ""
	@echo "Docker Commands:"
	@echo "make docker-build   - Build Docker image"
	@echo "make docker-run     - Run Docker container"
	@echo "make logs           - View container logs"
	@echo "make stop           - Stop and remove container"
	@echo ""
	@echo "Docker Compose Commands:"
	@echo "make up             - Start backend + MongoDB (compose)"
	@echo "make down           - Stop containers"
	@echo "make restart        - Restart containers"
	@echo "make ps             - Show container status"
	@echo ""

## Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

## Run in development mode (nodemon)
dev:
	@echo "Starting development server..."
	npm run dev

## Run in production mode
start:
	@echo "Starting server on port $(PORT)..."
	PORT=$(PORT) NODE_ENV=production npm run start

## Lint code 
lint:
	@echo "Running ESLint..."
	npm run lint

## Format code
build:
	@echo "Formatting code..."
	npm run format

## Clean node_modules and cache
clean:
	@echo "Cleaning project..."
	rm -rf node_modules
	rm -f package-lock.json

# -------------------------------
# Docker Commands
# -------------------------------

## Build Docker image
docker-build:
	@echo "Building Docker image..."
	docker build -t $(DOCKER_IMAGE) .

## Run Docker container
docker-run:
	@echo "Running Docker container..."
	docker run -d -p $(PORT):$(PORT) --name $(APP_NAME) $(DOCKER_IMAGE)

## View Docker container logs
logs:
	@echo "Viewing logs..."
	docker logs -f $(APP_NAME)

## Stop Docker container
stop:
	@echo "Stopping container..."
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true

# -------------------------------
# Docker Compose Commands
# -------------------------------

## Start all services (backend + MongoDB)
docker-up:
	@echo "Starting services with Docker Compose..."
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) up -d

## Build all services
docker-down:
	@echo "Build all services..."
	$(DOCKER_COMPOSE) build

## Stop all services
docker-down:
	@echo "Stopping all services..."
	$(DOCKER_COMPOSE) down

## Restart all services
docker-restart:
	@echo "Restarting all services..."
	$(DOCKER_COMPOSE) restart

## Show running containers
docker-ps:
	$(DOCKER_COMPOSE) ps

## Open MongoDB shell
mongo-shell:
	@echo "Opening MongoDB shell..."
	docker exec -it price-estimator-mongo mongosh
