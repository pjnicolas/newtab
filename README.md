# NewTab

## Requirements

- `git`
- `docker`
- `docker compose`
- `make`

## Installation

```bash
git clone URL
cd newtab
make install
```

## Usage for development

```bash
make run
```

## Usage for production

```bash
docker build -t newtab .
docker run -d -p 80:80 newtab
```
