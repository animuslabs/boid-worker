# boid-worker

## Prerequisites

- You will need a Telos  account with 10 TLOS staked to CPU and 1 to NET. <https://app.telos.net/testnet/developers>

## Setup
There are 2 ways to setup a Boid Worker, barebone in a VM or via a Docker container.
Before you do anything you need to have a working instance of a postgresdb. Best is to run it in a docker container.
When you have it up and running go to .env file and edit your details in the DATABASE_URL.

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

```sh
cp example.env.json .env.json
cp example.ecosystem.config.json ecosystem.config.json

```

Modify `.env.json` with your information about your worker node.

Make sure the worker name, authority, key are correct. For the rpc nodes you can specify as many as you like and the scripts will use it.

Modify `ecosystem.config.json` as you see fit, the defaults should be fine but can be optimized if you like. The env LOGLEVEL can be adjusted based on your preference between TRACE DEBUG INFO WARN ERROR

Then lets start the postgresql docker container first

``` sh
docker-compose up -d postgres
```

cp .example.env.docker to .env.docker

replace YOUR_DOCKER_IP with your host ipaddress

Note: this cannot be 127.0.0.1 or localhost as docker containers have no access to that.

to build the container image and initialize the postgresql Database run the following command: 

```sh

docker build . -t boidworker

```

once the image is created you can start it with docker-compose

```sh

docker-compose up 

```

if you want to run it in the background type:

```sh

docker-compose up -d

```

You can find the latest verison of docker-compose for ubuntu 22.04 here
<https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04>

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

`port`:8018

When running the History API server, this is the internal port the history server will expose. You can use your own firewall or the built in proxy config to expose the server externally.

### Operation

copy the history ecosystem file, customize it as you need and then run it with pm2.

```sh
cp ./example.history.ecosystem.config.json ./history.ecosystem.config.json
pm2 start ./history.ecosystem.config.json
```

The file runs three services by default:

- `loadSysActions.js`: Pulls recent history data (runs in a continuous loop).
- `cleanOldRecords.js`: Runs daily to cleanup old history data.
- `history.js`:the history api, enables users to query your history data, configure the port to expose externally

The `loadsysActions` job only pulls the past 24 hours of history data when you first run it, to backfill all history data (up to your configured limit) You need to manually run the `backfillSysActions` script. The script only needs to be run once during initial setup. If you node goes offline for an extended period but still retains the history data in your database then the `loadSysActions` script will automatically grab all the actions that happened while you were offline until it is back in sync.

```sh
cd dist
node ./util/backfillSysActions.js
```

While this script is running you can browse the database to see data being loaded
This requires localhost access to port 5001 , so not an option on VPS

```sh
yarn prisma studio
```

When the script finishes that means all history data is loaded into your DB up to your limits.

### History Advanced

The `backfillSysActions` script loads data backwards and `loadSysActions` loads data forwards. Under normal circumstaces you should have a full history, but in cases where there is holes in your data, like from getting bad data from a hyperion node, or database errors, you can manually pull actions within an arbitrary time range using the `util/fillRangeSysActions` script.

This script is meant to be run manually, it will download all actions in a range and then place them in the DB overwriting any existing records.

### History Deltas
For debugging and additional insight you may opt to index state delta changes. Normal history node operation should not need to run this.
`jobs/history/loadStateDeltas.ts` to load deltas forwards
`util/backfillDeltas.ts` to load data backwards, when your configured `keepHistoryDataDays` is reached the script will stop.

#### Syntax
The first parameter is the name of the action, or "all". The action must be listed in the `lib/injest.ts` `actionMap` object. The second parameter is the start of the range to pull data from, the third parameter is the end of the range.

To pull all actions between 2022-12-20 and 2022-12-30

```sh
cd dist
node ./util/fillRangeSysActions.js all 2022-12-20 2022-12-30
```

To pull all stake actions between 2022-12-20 and 2022-12-30

```sh
cd dist
node ./util/fillRangeSysActions.js stake 2022-12-20 2022-12-30
```
## API for Boid Users Power
To run it use pm2 and example.historyDeltasAPI.ecosystem.config.json file
```sh
cp ./example.historyDeltasAPI.ecosystem.config.json ./historyDeltasAPI.ecosystem.config.json
pm2 start ./historyDeltasAPI.ecosystem.config.json
```
you can edit the port that this API uses in .env file  
default settings: TRPC_API_PORT=3001

## Relayer
To run a relayer you need to have a local running IPFS node with port 5001 (the admin port) available and configured in the ipfs section of the .env.json file. Additoionally it's higly suggested you expose the ipfs public gateway (8080) port so that users could use it in the Boid application. The ipfs gatway can be entered into the proxy section of the config if you are using the built in proxy server or you could use your own firewall solution.

We recommend using Kubo's ipfs , its a single golang binary you need to install in /usr/local/bin , you can find systemd scripts for it in the config folder
<https://github.com/ipfs/kubo/releases/download/v0.17.0/kubo_v0.17.0_linux-amd64.tar.gz>
Warning: DO NOT EXPOSE the RPC port (e.g. 5001) of ipfs to the internet !!

In addition make sure to have relayer port setup in .env.json and firewall configured properly to allow connections from outside, including your dns / domain

```sh
cp ./example.relayer.ecosystem.config.json ./relayer.ecosystem.config.json
pm2 start ./relayer.ecosystem.config.json
```

## Pintastic
To run automatic pinning for all Boid NFTs IPFS Collections you can run the Pintastic service

example.pintastic.ecosystem.config.json

in the index.ts file located in jobs/ipfspinning
you can edit at what intervals the data will be checked from chains (EOS, WAX, TelosTestnet) and pinned to your local IPFS node/nodes.

In links.ts there is a const IPFSnodes where you can edit your internal node setup.
In collectionsEOS, collectionsTelos and collectionsWAX you can add AtomicHub Collections that you may want to pin in addtion to offical Boid ones.
More than 1 BoidTeam Info Pinnnig is still under dev.
In the const endpoints you can change which API endpoints you want to use for this service.
