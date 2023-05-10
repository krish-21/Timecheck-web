# Timecheck Web

## Prerequisites

1. Install [VSCode](https://code.visualstudio.com/download)
2. Install [git](https://github.com/git-guides/install-git)
3. Install [NVM](https://github.com/nvm-sh/nvm)

## Setup VSCode

1. Download ESLint Extension
2. Download Prettier Extension

## Setup Repository

1. Clone Repository:

```bash
git clone https://github.com/krish-21/Timecheck-web.git
```

2. cd into Directory:

```bash
cd Timecheck-web
```

3. Install specified node version using nvm:

```bash
nvm install
```

4. Use installed node version using nvm:

```bash
nvm use
```

5. Copy sample env & Rename file:

```bash
cp .env.sample .env
```

## Setup Dependencies

1. Install Node Modules:

```bash
npm ci
```

IMPORTANT: Do not run `npm install` as it will edit `package.json`!

2. Setup Husky

```bash
npm run prepareHusky
```

## Run App

# Start Metro

1. Start Dev Sever

```bash
npm start
```

App is live at [http://127.0.0.1:3000](http://127.0.0.1:3000) | [http://localhost:3000](http://localhost:3000)
