**IsTheChainHalted-Discord-Bot** is a Discord Bot that shows whether the Namada chain is halted or not.

It also shows:
- the last block height
- the last epoch
- when the chain was halted

![image](https://github.com/Rigorously/IsTheChainHalted-Discord-Bot/assets/31181988/79daa0f7-b2dd-4526-9176-180ede569661)

The chain statistics are provided by https://isthechainhalted.today.

# Installation

Copy or clone the repository. 

Install the required Node.js packages with `npm i`.

Register a new Discord application: https://discord.com/developers/applications

Get a `token` from the Bot tab and store it in config.json.

Get the `clientId` from the OAuth2 tab and store it in config.json.

Create an invite link with the OAuth2 URL Generator on the OAuth2 tab. Pick the bot scope first.

Run the bot with `npm start`.