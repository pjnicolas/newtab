.PHONY: install up down logs

install:
	pnpm install

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f
