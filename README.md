# boid-worker

## Setup
From a fresh Ubuntu VM

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 16
npm i -g pm2 yarn
git clone https://github.com/animuslabs/boid-worker.git
cd boid-worker
yarn
yarn prisma db push
cp example.env.json .env.json
cp example.ecosystem.config.json ecosystem.config.json 
```
Modify .env.json with your information about your worker node. Make sure the worker name, authority, key are correct. For the rpc ndoes you can specify as many as you like and the scripts will automatically use them and if one fails will retry actions on another node. Additionally the script will push actions to up to 4 endpoints to reduce the chance of trx being lost.

Modify `ecosystem.config.json` as you see fit, the defaults should be fine but can be optimized if you like. The env LOGLEVEL can be adjusted based on your preference between TRACE DEBUG INFO WARN ERROR.

## Start Oracle Node
```sh
pm2 start ecosystem.config.json
```
To ensure everything is running properly, run `PM2 logs` and watch for any errors.
