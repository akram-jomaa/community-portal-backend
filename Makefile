.PHONY: run-db build run-server

run-db:
	docker compose  up -d

build:
	npm run build

run-server: build
	npm start
