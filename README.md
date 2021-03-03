# Honey Framework UI
* Creates HF services as background processes
* Enables order types (Ping/Pong, Iceberg, TWAP and Accum/Dist)
* Create customer order types (coming soon)

## Installation

```bash
git clone https://github.com/bitfinexcom/bfx-hf-ui
cd bfx-hf-ui
npm  install
```
Create folder to store local db
```
mkdir ~/.honeyframework
touch ~/.honeyframework/algos.json
touch ~/.honeyframework/hf-binance.json
touch ~/.honeyframework/hf-bitfinex.json
touch ~/.honeyframework/ui.json
```

## Run in the browser

```
npm run build
npm run start-server
npm run start-ds-bitfinex
npm start
```

### Dev Enviroment Config

> For a full reference, refer to the [CRA environment config docs](https://create-react-app.dev/docs/adding-custom-environment-variables)

Several env vars are available for configuring the behavior of the live-reload
webpack server & build system. These only affect the server responsible for
the static react app content, and are as follows (all optional):

```sh
# Static SPA server (live-reload)
PUBLIC_URL='/' # URL prefix for all assets
HOST='0.0.0.0'
PORT=10

# HTTPS handling, cert & key are relative to app root
HTTPS='true' # only valid value
SSL_CRT_FILE='...'
SSL_KEY_FILE='...'

# General
BABEL_ENV='development'
NODE_ENV='development'

# As per CRA, this allows one to override the path to the node_modules folder
NODE_PATH="$(pwd)"
```

*Note: `bfx-hf-ui` is an exploded CRA, and as such the exact env vars available
ay not match the latest CRA release. Consult
[config/env.js](/blob/master/config/env.js) and
[config/getHttpsConfig.js](/blob/master/config/getHttpsConfig.js) for the exact
vars in use.*

## Build electron app manually

Generates an installable application to run independently from the browser. Once you have ran the below command navigate to the `/dist` folder and select the instillation executable file for the operating system that you are using.

```bash
npm run build
npm run dist-win-unpruned # for windows
npm run dist-mac # for mac
npm run dist-linux # for linux
```

## Install pre-built electron app

Head to the latest cut [releases](https://github.com/bitfinexcom/bfx-hf-ui/releases) and locate the most recent release. Once there you will see installers attached for `linux`, `mac` and `windows`. Run the installer for the operating system that you are using.

## The UI

Starting the HF UI will spawn all of the Honey Framework services that are needed to register custom algo-order definitions in the background. Currently (as of release 1.0.0) the UI will register the built in default order types which will be instantly available for use in the bitfinex.com UI. For more info on how to use algo orders once the UI is running head [here](https://medium.com/bitfinex/announcing-the-honey-framework-algorithmic-orders-8065fb70c65c).

![Alt text](res/bfx-hf-ui.png "Title")

## Up and coming features

* Ability to code your own definitions from within the UI
* Real-time info updates on executing orders
* Ability to Enable/Disable order definitions

## Contributing

1. Fork it (https://github.com/bitfinexcom/bitfinex-api-go)
2. Create your feature branch (`git checkout -b my-new-feature)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Trigger Travis build

Travis automatically builds and deploys this code to the github releases page whenever a commit specifying a new tag ('v3.0.4', 'v5.0.4' ect...) is merged into master.
