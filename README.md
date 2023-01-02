# boid-worker

## Prerequisites
- You will need a Telos Testnet account with 10 TLOS staked to CPU and 1 to NET. https://app.telos.net/testnet/developers
- You need tesnet BOID tokens, earn them by running the testnet app or ask for free tokens from boid devs in social channels.

## Setup
There are 2 ways to setup a Boid Worker, barebone in a VM or via a Docker container.

### 1. Ubuntu 22.04 LTS VM Setup Method

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

#### Start Oracle Node

```sh
pm2 start ecosystem.config.json
```

To ensure everything is running properly, run `PM2 logs` and watch for any errors.

#### NOTE - if you want to add more log time data run oracle like this

```sh
pm2 start ecosystem.config.json --log-date-format "YYYY-D-MM HH:mm:ss"
```

#### Important transactions to start
To register your oracle node you need to deposit BOID collateral.
##### 1. Send Collateral to power.boid smartcontract
You will need to specify your sending a custom token as the default is TLOS.
The token contract is "token.boid" the symbol is BOID
##### send 10000 BOID with memo: collateral to the contract --> power.boid

##### 2. Set your worker to active mode

##### "setstandby" action --> oracle: "yourvalidacc", standby: "false", actor: "yourvalidacc", permission: "active"

### 2. Docker Setup Method
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


## History

### Configuration

If you want to provide a boid History API make sure the history segment of your .env.json is configured properly.

`hyperion`:[]

This array is for Hyperion nodes which you can pull history data from, nodes are used randomly and if one node returns error the query will be retried with another node.

`injestChunkSize`: 500

When pulling actions from the Hyperion node, how many actions to request at once. Greater than 1000 or less than 100 could cause issues.

`keepHistoryDataDays`:30 

How many days of history should your node retain. The purpose is to cleanup old data from your node. On testnet it's not recommended to keep more than 30 days of data because abi changes could cause issues. On mainnet a good amount of history to keep might be 6 months to one year.

`injestLoopDelaySec`:10

When injesting data, how long to wait between each loop. The primary purpose is to keep from getting automatically rate-limited by hyperion nodes.

### Operation

copy the history ecosystem file, customize it as you need and then run it with pm2.
```sh
cp ./example.history.ecosystem.config.json ./history.ecosystem.config.json
pm2 start ./history.ecosystem.config.json
```
The file runs `loadSysActions.js` to pull recent history data (runs in a continuous loop) and `cleanOldRecords.js` (runs daily) to cleanup old history data.

The job only pulls the past 24 hours of history data when you first run it, to backfill all history data (up to your configured limit) You need to manually run the `backfillSysActions` script. The script only needs to be run once during initial setup. If you node goes offline for an extended period but still retains the history data in your database then the loadSysActions script will automatically grab all the actions that happened while you were offline.

```sh
cd dist
node ./util/backfillSysActions.js
```

While this script is running you can browse the database to see data being loaded
```sh 
yarn prisma studio
```

When the script finishes that means all history data is loaded into your DB up to your limits. 