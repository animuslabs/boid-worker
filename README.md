# boid-worker

## Prerequisites
- You will need a Telos Testnet account with 10 TLOS staked to CPU and 1 to NET. https://app.telos.net/testnet/developers
- You need tesnet BOID tokens, earn them by running the testnet app or ask for free tokens from boid devs in social channels.

## Setup
From a fresh Ubuntu VM

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 18
npm i -g pm2 yarn
git clone https://github.com/animuslabs/boid-worker.git
cd boid-worker
yarn
yarn prisma db push
yarn build
cp example.env.json .env.json
cp example.ecosystem.config.json ecosystem.config.json
```

Modify `.env.json` with your information about your worker node. Make sure the worker name, authority, key are correct. For the rpc nodes you can specify as many as you like and the scripts will automatically use them and if one fails will retry actions on another node. Additionally the script will push actions to up to 4 endpoints to reduce the chance of trx being lost.

Modify `ecosystem.config.json` as you see fit, the defaults should be fine but can be optimized if you like. The env LOGLEVEL can be adjusted based on your preference between TRACE DEBUG INFO WARN ERROR.

## Start Oracle Node

```sh
pm2 start ecosystem.config.json
```

To ensure everything is running properly, run `PM2 logs` and watch for any errors.

## NOTE - if you want to add more log time data run oracle like this

```sh
pm2 start ecosystem.config.json --log-date-format "YYYY-D-MM HH:mm:ss"
```

## Important transactions to start
To register your oracle node you need to deposit BOID collateral.
### 1. Send Collateral to power.boid smartcontract
You will need to specify your sending a custom token as the default is TLOS.
The token contract is "token.boid" the symbol is BOID
#### send 10000 BOID with memo: collateral to the contract --> power.boid

#### 2. Set your worker to active mode

#### "setstandby" action --> oracle: "yourvalidacc", standby: "false", actor: "yourvalidacc", permission: "active"

## Docker Setup
to build the worker first make your configuration files
```
cp example.env.json .env.json
cp example.ecosystem.config.json ecosystem.config.json
```
Modify `.env.json` with your information about your worker node. 

Make sure the worker name, authority, key are correct. For the rpc nodes you can specify as many as you like and the scripts will use it.

Modify `ecosystem.config.json` as you see fit, the defaults should be fine but can be optimized if you like. The env LOGLEVEL can be adjusted based on your preference between TRACE DEBUG INFO WARN ERROR

to build the container image do
```
docker build . -t boidworker
```

once the image is created you can start it with docker-compose
```
docker-compose up
```

if you want to run it in the background type:
```
docker-compose up -d
```

You can find the latest verison of docker-compose for ubuntu 22.04 here
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04

