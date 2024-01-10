FROM node:20.10.0-bookworm AS builder
RUN npm install --global pnpm@8.10.5
WORKDIR /code
COPY . .
RUN pnpm install
RUN pnpm run build


FROM nginx:1.25.3-bookworm
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/dist /usr/share/nginx/html
