**IsTheChainHalted-Discord-Bot** is a Discord Bot that shows whether the Namada chain is halted or not.

It also shows:
- the last block height
- the last epoch
- when the chain was halted

![image](https://github.com/Rigorously/IsTheChainHalted-Discord-Bot/assets/31181988/79daa0f7-b2dd-4526-9176-180ede569661)
![image](https://github.com/Rigorously/IsTheChainHalted-Discord-Bot/assets/31181988/56119625-a412-42f9-8b0b-e7fbce131bbc)


The chain statistics are provided by https://isthechainhalted.today. When linking to the website in Discord, the status of the chain will be embedded.

![image](https://github.com/Rigorously/IsTheChainHalted-Discord-Bot/assets/31181988/9b6f80d1-4dd0-432d-aca5-d442c6bc7211)
![image](https://github.com/Rigorously/IsTheChainHalted-Discord-Bot/assets/31181988/34601875-e9b2-440c-a2fb-8cc5613f3e86)


# Installation

Copy or clone the repository. 

Install the required Node.js packages with `npm i`.

Register a new Discord application: https://discord.com/developers/applications

Get a `token` from the Bot tab and store it in config.json. Keep it secret at all cost!

Get the `clientId` from the OAuth2 tab and store it in config.json.

`guildId` in config.json is not used at this time.

Create an invite link with the OAuth2 URL Generator on the OAuth2 tab. Only the `bot` scope is necessary, without any permissions.

Run the bot with `npm start`.

# Bonus

The progression of the block height during the Shielded Expedition.

![image](https://github.com/Rigorously/IsTheChainHalted-Discord-Bot/assets/31181988/776254b6-3a0c-4e64-92d9-3904b831dd06)

