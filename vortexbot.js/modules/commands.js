`use strict`;

import Discord from 'discord.js';
import { prefix, embedColor, embedFooter, rulesChannel } from './constants.js';
import { fetchQuotes, S3 } from './helpers.js';
import files from 'fs';
import moment from 'moment';

const s3 = new S3();

export const commands = {
	[`help`]: {
		command: `help`,
		aliases: [`commands`, `h`],
		usage: `${prefix}help, ${prefix}h, or ${prefix}commands`,
		description: `List of commands because you need help.`,
		execute: async function(message){
			const helpEmbed = {
				color: embedColor,
				title: `Commands`,
				fields: commandList.map( key => {
					const commandUsage = commands[key]?.usage || prefix + key;
					const commandDescription = commands[key]?.description;
					const staffOnly = commands[key].staff;

					if (!staffOnly) {
						return {
							name: commandUsage,
							value: commandDescription,
						}
					}
				}).filter( c => c?.name !== undefined ),
				...embedFooter,
			};

			const macroEmbed = {
				color: embedColor,
				title: `Image Macros`,
				fields: macroList.map( key => {
					const macroDescription = macros[key]?.description;

					return {
						name: key,
						value: macroDescription,
					}
				}),
				...embedFooter,
			};

			try {
				await message.author.send(``, {embed: helpEmbed})
				await message.author.send(``, { embed: macroEmbed})
			} catch(error) {
				await message.channel.send(``, {embed: helpEmbed})
				await message.channel.send(``, { embed: macroEmbed})
			}
		}
	},
	[`resources`]: {
		command: `resources`,
		aliases: [`resource`, `r`],
		usage: `${prefix}resources, ${prefix}resource, or ${prefix}r`,
		description: `A list of resources!`,
		execute: async function(message){
			const resources = {
				color: embedColor,
				title: `Resources`,
				description: `It has occured to me that we do not have a go-to topic for people starting out, just ones spread out among the boards that get lost over time. Since the forum won’t be here forever, it’s now a bot command! It is our job to see that they get started out on the right foot, instead of lost in the dark like a drunken babe. 
				
				Don’t hesitate to dump some more resources at the Admins and Mods.`,
				image: {
					url: `http://i.imgur.com/uUPtBTN.gif`,
				},
				fields: [
					{
						name: `Contributed Databases`,
						value: `[YB’s & ’Fro’s DBZ Collection](https://www.dropbox.com/sh/gm410186fy7whoo/AAB90TIduqT2C68C97NOioSqa)
								[MadCX’s Database of Customs with a bit of Dragonball](https://www.dropbox.com/sh/cm6kg9syvuy39i8/AACldA5SUgG_8RRw1xJkhfiVa?dl=0)
								[Backgrounds!](https://www.dropbox.com/sh/iz8rig9f1q03rt1/AADgDl7loX6F0QpISAcyHMeIa)
								[Effects!](https://www.dropbox.com/sh/bkhl7r5z82z29zs/AAAp_HZL2_Nc-PNKPtTDz8G4a)
								[RPG Maker Bases](https://www.dropbox.com/sh/wxxclk930hevtt3/AADkcuw_VUKgHfMLe2cV6wcTa?dl=0)`,
					},
					{
						name: `Bases and Tutorials`,
						value: `[Pixel Logic - A Guide to Pixel Art by Michafrar](https://drive.google.com/open?id=0B2Qw4JnEN54mS1dVcERoWmNjUmc) 
								[Need a base tutorial? Here’s one by Seto](http://i.imgur.com/rZ5uOcv.png)
								[Need a base tutorial... *IN VIDEO FORM?!* Here’s one by AB](https://www.youtube.com/watch?v=IY9hIkE7jRE)
								[Need a basic spriting tutorial? Here’s one by Phanny](https://www.deviantart.com/braddyapples/art/LSW-Sprite-Tutorial-001-Basics-601197933)
								[Need a style conversion tutorial? Here’s one by Chef](https://cdn.discordapp.com/attachments/367761456923672576/621547358035116061/MadCX_style_conversion_tutorial.png)
								[Need a base tutorial? Here’s one by Entei](https://cdn.discordapp.com/attachments/269272649354444800/315965119525945354/unknown.png)
								[Phanny’s Hair Tutorial](https://img00.deviantart.net/a6c1/i/2018/041/b/4/lsw_sprite_tutorial_002__hair_by_braddyapples-dc2rres.png)
								[Anase’s Phenome (Lip Sync) Set](https://i.imgur.com/MlEauqP.png)`,
					},
					{
						name: `Animation Tutorials`,
						value: `[Pixel Art Tutorail Dump by MiniBoss (Pedro Medeiros)](http://blog.studiominiboss.com/pixelart)
								[Darkstalkers and the Twelve Principles of Animation](http://art-eater.com/2010/07/test-1-darkstalkers/)
								[Making Fluid and Powerful Animations For Skullgirls](https://www.youtube.com/watch?v=Mw0h9WmBlsw)
								[Duelyst Attack Animation Tutorial by Adam Kling](https://www.youtube.com/watch?v=iJOUTSy0fQI)
								[Pixel Art: Animation smoothness by Skaz](http://lost-fortress.com/index.php/2017/08/24/pixel-art-animation-smoothness/)`,
					},
					{
						name: `Color Tutorials`,
						value: `[Thinking in Color](http://finalbossblues.com/thinking-in-color/)
								[Hue Shifting by GDquest](https://youtu.be/RL_5va7jEx8)
								[Hue Shifting by Solar Lune](https://youtu.be/yRCTL0PA4X0)`,
					},
					{
						name: `Anatomy`,
						value: `[Line of Action (Figure Drawing)](https://line-of-action.com/practice-tools/figure-drawing/)
								[Google Drive folder full of faces](https://drive.google.com/folderview?id=0B8XR5dxrltiaTURoZXBTS0V2RHc)
								[Proko (Anatomy)](http://www.proko.com/library/)
								[CroquisCafe (Vimeo with videos on Anatomy)](https://vimeo.com/croquiscafe)`,
					},
					{
						name: `Vortex Logo`,
						value: `[.PSD file](https://www.dropbox.com/s/i408t1mfay5toek/vortex-logos.psd?dl=0)
								[.AI file](https://www.dropbox.com/s/mj608yq290imh45/vortex-logos.ai?dl=0)`,
					},
				],
				...embedFooter,
			};

			if (message.guild !== null) {
				const oneOfUs = message.member.roles.cache.get(`201047136932986880`) || message.member.roles.cache.get(`670224589057425408`);

				try {
					oneOfUs ? 
						await message.author.send(``, {embed: resources}) : 
						await message.author.send(`Sorry, you do not have enough posts. Post more outside of bullshit-island, to level up to a Vortexian. If you turn purple, you’re good.`)
				} catch(error) {
					oneOfUs ? 
						await message.channel.send(`Open your DMs, ${message.author}. I can’t send your the things if they aren’t open. *There are instructions on how are in <${rulesChannel}>*`) : 
						await message.channel.send(`Sorry, you do not have enough posts. Post more outside of bullshit-island, to level up to a Vortexian. If you turn purple, you’re good.`)
				}
			} else {
				message.channel.send(`Sorry, you can’t use resource commands here.`)
				console.log(`Can not use resource`)
			}
		},	
	},
	[`logo`]: {
		command: `logo`,
		description: `If you want the pretty Vortex logo for your sheet. (It still has its spot in the resources command.`,
		execute: async function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://i.imgur.com/bYdejC5.png`,
				},
				fields: [
					{
						name: `Vortex Logo`,
						value: `[.PSD file](https://www.dropbox.com/s/i408t1mfay5toek/vortex-logos.psd?dl=0)
								[.AI file](https://www.dropbox.com/s/mj608yq290imh45/vortex-logos.ai?dl=0)`,
					}
				],
				...embedFooter,
			};

			try {
				await message.author.send(``, {embed: embed})
			} catch(error) {
				message.channel.send(``, { embed: embed})
			}
		}	
	},
	[`quote`]: {
		command: `quote`,
		usage: `${prefix}quote <optional username>`,
		description: `A random quote from these putzes!`,
		execute: async function(message){
			const command = prefix + this.command;
			const arguement = message.content.substring(command.length).trimStart();

			const quoteMachine = list => {
				const whichQuote = Math.floor( Math.random() * ( list.length ));
				const embed = {
					color: embedColor,
					fields:[
						{
							name: `“${list[whichQuote].quote}”`,
							value: `— ${list[whichQuote].author}`,
						}
					],
					...embedFooter,
				};

				message.channel
					.send(``, {embed: embed})
					.then(console.log(`Dump the quotes!`))
					.catch(console.error);
			};

			const quotes = await fetchQuotes();

			try {
				if (!arguement) {
					quoteMachine(quotes);
				} else {
					const quoteSearchArray = quotes.filter(username => {
						if (username.author.toLowerCase() === arguement.toLowerCase()) return username.author;
					})

					if (quoteSearchArray[0] !== undefined){
						quoteMachine(quoteSearchArray);
					} else {
						await message.channel.send(`${arguement} doesn’t seem to have a quote, dude.`)
						console.log(`No quotes. Tragic.`)
					}
				}
				
			} catch(error) {
				console.error(error);
			}
		}	
	},
	[`quote-add`]: {
		command: `quote-add`,
		staff: true,
		execute: async function(message){
			const command = prefix + this.command;
			const messageMinusCommand = message.content.substring(command.length).trimStart();
			const modOrAdmin = message.guild !== null ? 
				message.member.roles.cache.get('201030035723911168') || message.member.roles.cache.get('201500366930444289') : 
				false;
			const quoteToAdd = {};
			const timeFrame = 60000;

			if (!modOrAdmin) { 
				message.channel.send(`Sorry, you do not have the permissions to use this command.`);
				return false;
			}

			const initAddQuote = async () => {
				const didPosterRespond = m => message.author.id === m.author.id;

				message.channel.send(`What is the quote you want to add? (You have ${timeFrame/1000} seconds to reply)`)

				try {
					const replyMessage = await message.channel.awaitMessages(didPosterRespond, { time: timeFrame, max: 1, errors: [`time`] })
					quoteToAdd.quote = replyMessage.first().content.trim();
					console.log(`Quote added: `, quoteToAdd.quote)
					nextQuoteQuestion()
				} catch(error) {
					message.channel.send(`You've failed to specify a quote. Aborting...`)
				}
			}

			const nextQuoteQuestion = async () => {
				const didPosterRespond = m => message.author.id === m.author.id;

				message.channel.send(`Who said the quote? (You have ${timeFrame/1000} seconds to reply)`)

				try {
					const replyMessage = await message.channel.awaitMessages(didPosterRespond, { time: timeFrame, max: 1, errors: [`time`] })
					quoteToAdd.author = replyMessage.first().content.trim();
					console.log(`Author attached to quote:`, quoteToAdd.author)
					updateQuotes(quoteToAdd)
				} catch(error) {
					message.channel.send(`You've failed to specify an author. Aborting...`)
				}
			}

			const updateQuotes = async (quote, fileName = 'quotes.json') => {
				console.log(`Quote to upload: `, quote)

				const saveNewQuote = async () => {
					const currentQuotes = await fetchQuotes();
					currentQuotes.push(quote);

					const newQuotes = JSON.stringify(currentQuotes, null, 2);

					const updateFile = await files.promises.writeFile(fileName, newQuotes);
					const file = await files.promises.readFile(fileName);

					console.log(`Attempting to push to the S3 bucket...`)

					try {
						await s3.upload(fileName, file)
						console.log(`Huzzah!`)
					} catch(error) {
						console.error(error)
					}

				}

				const embed = {
					color: embedColor,
					title: `You've successfully added the quote:`,
					fields: [
						{
							name: `“${quote.quote}”`,
							value: `— ${quote.author}`,
						}
					],
					...embedFooter,
				};

				try {
					await saveNewQuote();
					await message.channel.send(``, { embed })
				} catch (error) {
					console.error(error)
				}
			}

			try {
				await initAddQuote()
			} catch (error) {
				console.error(error)
			}
		}	
	},
	[`quotelist`]: {
		command: `quotelist`,
		usage: `${prefix}quotelist <username>`,
		description: `Check how many quotes someone has. For vanity reasons.`,
		execute: async function(message){
			const command = prefix + this.command;
			const arguement = message.content.substring(command.length).trimStart();

			const quotes = await fetchQuotes();

			try {
				if (!arguement) {
					message.channel.send(`Hey, you need a username to search!`);
					return false;
				}

				const quoteSearchArray = quotes.filter(username => {
					if (username.author.toLowerCase() === arguement.toLowerCase()) return username.author;
				})

				if (quoteSearchArray[0] !== undefined){
					const quoteCount = `${quoteSearchArray[0].author} has ${quoteSearchArray.length} ${[(quoteSearchArray.length > 1 ) ? `quotes.` : `quote.`]}`;
					const quotesFromUser = quoteSearchArray.map( (index, item) => `“${quoteSearchArray[item].quote}”\n`);
					
					const embed = {
						color: embedColor,
						description: quotesFromUser.join(``),
						...embedFooter,
					};

					await message.channel.send(quoteCount, {embed: embed})
					console.log(`Thems the quotes.`)
				} else {
					await message.channel.send(`${arguement} doesn’t seem to have a quote, dude.`)
					console.log(`No quotes. Tragic.`)
				}
			} catch (error) {
				console.error(error)
			}
		}	
	},
	[`contest`]: {
		command: `contest`,
		description: `Get the details of the current battle of the Vortexians. (boy does that sound lame)`,
		execute: async function(message){
			const command = prefix + this.command;
			const arguements = message.content.substring(command.length).trimStart();

			const contestDetails = async json => {
				const contestEmbed = {
					color: embedColor,
					title: json.title,
					fields:[
						{
							name: `Description`,
							value: json.description,
						},
						{
							name: `Due Date`,
							value: json.date,
						},
					],
					...embedFooter,
				};

				await message.channel.send(``, {embed: contestEmbed})
				console.log(`Dump the contest details back out!`)
			};

			const uploadFile = async fileName => {
				const file = await files.promises.readFile(fileName);

				try {
					await s3.upload(fileName, file)
				} catch (err) {
					console.error(err);
				}
			}

			const updateContestDetails = async contestData => {
				const writeToLocal = await files.promises.writeFile(`contest.json`, contestData);

				console.log(`Update contest details...`);
				
				try {
					const contest = await files.promises.readFile(`contest.json`);
					await uploadFile(`contest.json`)
					console.log(`Contest file uploaded.`)
					return await JSON.parse(contest);
				} catch (err) {
					console.error(err);
				}
			};

			if (!arguements) { 
				const contest = await s3.get(`contest.json`);
				await contestDetails(contest);
			} else {
				const modOrAdmin = message.guild !== null ? 
					message.member.roles.cache.get('201030035723911168') || message.member.roles.cache.get('201500366930444289') : 
					false;
				const details = arguements.split(/(\s?\d\d\d\d\-\d\d\-\d\d\s?)/gm);
				const title = details[0];
				const date = details[1];
				const description = details[2];

				if ( message.guild === null && message.channel.type === `dm` ) {
					await message.channel.send(`Sorry, you can not use that command here.`)
					console.log(`Dammit, not in DMs!`)
					return false;
				}

				if (!modOrAdmin) { 
					await message.channel.send(`Sorry, you do not have the permissions to use this command.`); 
					return false
				}
				
				if ( new Date(date).toDateString() === `Invalid Date` ){
					await message.channel.send(`The date needs to be set up like YYYY-MM-DD.`);
					console.log(`Date check failed.`);
				} else if ( title === `` && description === `` ) {
					await message.channel.send(`You need a title and a description.`);
					console.log(`Title and Description check failed.`);
				} else if ( title !== `` && description === `` ) {
					await message.channel.send(`You need a description.`);
					console.log(`Description check failed.`);
				} else if ( title === `` && description !== `` ) {
					await message.channel.send(`You need a title.`);
					console.log(`Title check failed.`);
				}  else {
					const dueDate = moment(date.trim()).format(`dddd[,] MMMM Do[,] YYYY`);
					const timeFrame = 60000;

					const linebreaks = description.split(/\n/gm);
					const newContestDetails = JSON.stringify({ title, date: dueDate, description: linebreaks }, null, 2)

					const didPosterRespond = m => message.author.id === m.author.id;

					message.channel.send(`You are about to overwrite the contest that is already set. Continue? Y / N (You have ${timeFrame/1000} seconds to respond.)`);

					try {
						const replyMessage = await message.channel.awaitMessages(didPosterRespond, { time: timeFrame, max: 1, errors: [`time`] })
						const confirmed = replyMessage.first().content === 'Y' || replyMessage.first().content === 'y'

						if (confirmed) {
							const contest = await updateContestDetails(newContestDetails)
							contestDetails(contest)
						} else {
							const denied = await message.channel.send(`Okay, will leave it as is, boss.`)
							console.log(`No change.`)
							denied.delete({ timeout: 2500 }) 
						}
					} catch(error) {
						const timeoutReply = await message.channel.send(`You took too long, so it will remain as is.`)
						console.log(`Took too long grandpa.`)
						timeoutReply.delete({ timeout: 2500 }) 
					}
				}
				
			}
		}
	},
	[`wave`]: {
		command: `wave`,
		usage: `${prefix}wave <optional thing>`,
		description: `Waves a flag of encouragement!`,
		execute: async function(message){
			const command = prefix + this.command;
			const arguement = message.content.substring(command.length).trimStart();

			try {
				if (message.guild !== null) {
					const memberNickname = message.guild.member(message.author.id).displayName;

					!arguement ? 
						await message.channel.send(`\:checkered_flag: **${memberNickname}** waved the productivity flag! You can do it! \:checkered_flag:`):
						await message.channel.send(`\:checkered_flag: **${memberNickname}** waved the ${arguement} flag! You can do it! \:checkered_flag:`)
					
					console.log(`Wave the ${!arguement ? `encouragement!` : `${arguement}!`}`)
				} else {  
					await message.channel.send(`**You** waved a flag. You got this. \:+1:`)
					console.log(`They waved a flag. Thanks bud.`)
				}
			} catch(error) {
				message.channel.send(`The flag of encouragement is broken...`)
			}

			
		},	
	},
	[`3`]: {
		command: `3`,
		description: `Praise the almighty 3!`,
		execute: function(message){
			message.channel
				.send(`\\\\[T]/ Praise \:three:! \\\\[T]/`)
				.then(console.log(`Hail 3!`))
				.catch(console.error);
		},	
	},
	[`euh`]: {
		command: `euh`,
		description: `Question EUH, as is tradition.`,
		execute: function(message){
			message.channel
				.send(`What’s EUH?`)
				.then(console.log(`What’s EUH?`))
				.catch(console.error);
		},	
	},
	[`team3star`]: {
		command: `team3star`,
		aliases: [`tokusentai`],
		description: `TO KU SEN TAI!`,
		execute: function(message){
			message.channel
				.send(`TOKUSENTAI!`)
				.then(console.log(`TO-KU-SEN-TAI!`))
				.catch(console.error);
		},
	},
	[`howly`]: {
		command: `howly`,
		description: `Goddammit Howly!`,
		execute: function(message){
			message.channel
				.send(`Goddammit Howly!`)
				.then(console.log(`Goddammit Howly!`))
				.catch(console.error);
		},
	},
	[`when`]: {
		command: `when`,
		usage: `${prefix}when <thing>`,
		description: `Ask when.`,
		execute: function(message){
			const command = prefix + this.command;
			const arguement = message.content.substring(command.length).trimStart();

			if (!arguement) {
				message.channel
					.send(`YEAH WHEN?!`)
					.then(console.log(`nothing was whenned...`))
					.catch(console.error);
			} else {
				message.channel
					.send(`YEAH WHENS ${arguement.toUpperCase()}?!`)
					.then(console.log(`YEAH WHENS ${arguement.toUpperCase()}?!`))
					.catch(console.error);
			}
		},
	},
	[`wallcat`]: {
		command: `wallcat`,
		description: `***FUCK WALLCAT***`,
		execute: function(message){
			const messages = [`Damn it, Wall Cat`, `***YO, FUCK WALL CAT***`, `Go away Wall Cat!`, `wall cat no`];
			const random = Math.floor(Math.random() * ( messages.length ));

			// if arg
			// wallcat eat or change message?

			message.channel
				.send(messages[random])
				.then(console.log(`freakingwallcatwhydoyousuck`))
				.catch(console.error);
		},	
	},
};

export const macros = {
	[`officespace.jpg`]: {
		description: `*Yeah, that’ll be great.*`,
		execute: function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://media.makeameme.org/created/that-would-be-p5wfmj.jpg`,
				},
				...embedFooter,
			};

			message.channel.send(``, {embed: embed})
				.then(console.log(`Yeah, that’ll be great.`))
				.catch(console.error);
		},
	},
	[`shrug.jpg`]: {
		description: `For shrugging.`,
		execute: function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://cdn.discordapp.com/attachments/353322814973149204/394582959358869505/jNlijV3.png`,
				},
				...embedFooter,
			};

			message.channel.send(``, {embed: embed})
				.then(console.log(`¯\\_(ツ)_/¯`))
				.catch(console.error);
		},
	},
	[`popcorn.jpg`]: {
		description: `For intense arguements or stupidity.`,
		execute: function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://cdn.discordapp.com/attachments/201028921695666177/397052914507448330/image.png`,
				},
				...embedFooter,
			};

			message.channel
				.send(``, {embed: embed})
				.then(console.log(`Mmm. Buttery goodness.`))
				.catch(console.error);
		},
	},
	[`popcorn_hd.jpg`]: {
		description: `For intense arguements or stupidity. ***In HD***`,
		execute: function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://cdn.discordapp.com/attachments/201028921695666177/811976281776062464/popcorn_remastered.png`,
				},
				...embedFooter,
			};

			message.channel
				.send(``, {embed: embed})
				.then(console.log(`Mmm. Buttery clear goodness.`))
				.catch(console.error);
		},
	},
	[`thatsthejoke`]: {
		description: `That’s the joke. :|`,
		execute: function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://i.imgur.com/utzTCyo.png`,
				},
				...embedFooter,
			};

			message.channel
				.send(``, {embed: embed})
				.then(console.log(`Thats the joke...`))
				.catch(console.error);
		},
	},
	[`pierogi.jpg`]: {
		description: `Have a picture of delicious looking pierogies.`,
		execute: function(message){
			const embed = {
				color: embedColor,
				image: {
					url: `https://farm9.staticflickr.com/8208/8214278997_4c4479a181_b.jpg`,
				},
				...embedFooter,
			};

			message.channel
				.send(``, {embed: embed})
				.then(console.log(`Mmm, pierogi.`))
				.catch(console.error);
		},
	},
}

export const commandList = Object.keys(commands);
export const macroList = Object.keys(macros);