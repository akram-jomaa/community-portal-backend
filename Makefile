migrate:
	npx prisma migrate dev

run-db:
	docker compose  up -d

build:
	npm run build

run-server: build
	npm start
