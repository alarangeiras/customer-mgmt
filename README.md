# customer-mgnmt

## Requirements

* Node.js 16 (you can install through [NVM](https://github.com/nvm-sh/nvm) if you want)
* NPM
* [Docker](https://docs.docker.com/engine/install/) and [Docker-Compose](https://docs.docker.com/compose/install/)
* [AWS CLI v2](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-cliv2.html)
* Serverless CLi: `npm i -g serverless`

## Recommendations

* [Visual Studio Code](https://code.visualstudio.com/)
* [Prettier Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [ESLint Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [YAML Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

## How to start local development environment

1. Start docker compose in detached mode: `docker-compose up -d`
2. Create the _.env_ file using _.env.example_: `cp -v .env.example .env`
3. Install dependencies: `npm install`
4. Start serverless offline using the command: `npm run dev`

## Resources:

* Postman Collection: ./docs/customer-mgmt.postman_collection.json