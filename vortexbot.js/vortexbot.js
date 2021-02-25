`use strict`;

import Discord from 'discord.js';
import { prefix, botToken, rulesChannel } from './modules/constants.js';
import { commands, commandList, macros, macroList } from './modules/commands.js';
import { memeChecker } from './modules/helpers.js';
import moment from 'moment';

const bot = new Discord.Client();

bot.once(`ready`, () => {
	console.log(`Vortexbot Status: Ready! (${moment().format()})`);
});

bot.on('guildMemberAdd', member => {
	const guild = member.guild;
	const defaultChannel = guild.systemChannelID;

	console.log(`Welcome to ${guild.name}, ${member.user.username}! Have fun, relax, enjoy the pixels, read the rules, and remember to not drink the water.`);
	guild.channels.cache.get(defaultChannel).send(`Welcome to **${guild.name}**, <@${member.user.id}>! Have fun, relax, enjoy the pixels, read the <${rulesChannel}>, and remember to not drink the water.`);
});

bot.on('message', message => {
	if (message.author.bot) return false;

	(message.guild !== null) ?
		console.log(`“${message.cleanContent}” by ${message.author.username} in #${message.channel.name}`):
		console.log(`“${message.cleanContent}” by ${message.author.username} slid in the DMs`);

	memeChecker(message);

	if (message.content.startsWith(prefix)) {
		const command = message.content.split(/\s/g)[0].substring(prefix.length).toLowerCase();
		const noCommand = !commands[command];
		const foundAlias = commandList.map( key => {
			if (commands[key]?.aliases?.includes(command)) return key;
		}).filter( command => command).toString();

		if (noCommand && !foundAlias) return false;

		commands[noCommand ? foundAlias : command ].execute(message);
	}

	macroList.forEach( macro => {
		if (message.content.toLowerCase().includes(macro)) macros[macro].execute(message);
	});
});

bot.on(`messageUpdate`, ( message, updateMessage ) => {
	memeChecker(message, updateMessage, true);
})

bot.login(botToken);
