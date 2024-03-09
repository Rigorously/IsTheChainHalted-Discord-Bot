const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { statusUrl, token, chainHaltedAvatar, chainOkAvatar } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Update interval is set to x minutes in milliseconds.
// Apparently username and avatar changes are rate limited to 2 times per 10 minutes.
// Nicknames can be changed more often.
const updateInterval = 1 * 60 * 1000;

client.commands = new Collection();

let activityOptions = {
	'name': 'ActivityName',
	'state': 'ActivityState',
	'type': ActivityType.Custom
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const chainHaltedStr = "Chain Halted ❌";
const chainOkStr = "Chain OK ✔️";

let localIsHalted = null;
let lastAvatarChangeTime = 0;

// Make an ISO date time formatted string more compact
function formatISODateTime(dateTimeStr) {
	const date = new Date(dateTimeStr);

	const day = date.getDate();
	const month = months[date.getMonth()];
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// Pad single-digit day and minutes with leading zeros
	const formattedDay = day < 10 ? '0' + day : day;
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

	return `${formattedDay} ${month} ${hours}:${formattedMinutes}`;
}

function getChainStr(isHalted) {
	return isHalted ? chainHaltedStr : chainOkStr;
}

function setNickname(isHalted) {
	let newName = getChainStr(isHalted);
	client.guilds.cache.forEach((g) => {
		g.members.me.setNickname(newName);
	});
}

function getAvatarUrl(isHalted) {
	return isHalted ? chainHaltedAvatar : chainOkAvatar;
}

function setAvatar(isHalted) {
	try {
		client.user.setAvatar(getAvatarUrl(isHalted));
	} catch (error) {
		console.log(error);
	}
}

function setStatus(isHalted) {
	isHalted ? client.user.setStatus('dnd') : client.user.setStatus('online');
}

function isStatusChanged(isHalted) {
	return localIsHalted !== isHalted;
}

// When the client is ready, start checking the chain liveness
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	client.user.status = 'idle';

	(async function updateActivity() {
		try {
			const response = await fetch(statusUrl);
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			const status = await response.json();

			activityOptions.state = 'B' + status.latestBlockHeight + ' E' + status.epoch + ' | ' + formatISODateTime(status.latestBlockTime);
			client.user.setActivity(activityOptions);

			//Sync state only when necessary to prevent rate limit violation
			if (isStatusChanged(status.isHalted)) {
				localIsHalted = status.isHalted;
				console.log("Status changed: " + getChainStr(status.isHalted));
				setNickname(status.isHalted);
				setStatus(status.isHalted);
				setAvatar(status.isHalted);
			}
		} catch (error) {
			console.error(`Fetch error: ${error.message}`);
		}
		setTimeout(updateActivity, updateInterval);
	}
	)();
});

// Log in to Discord with the bot token stored in config.json. Keep the token out of the repo!
client.login(token);
