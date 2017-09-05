const Discord = require('discord.js');
const bot = new Discord.Client();
const timer = 1000;

bot.on('ready', () => {
	console.log('Ready for liftoff!');
});

bot.on('disconnected', () => {
	console.log('Whoops, done disconnected!');
});

// When a new person joins the Discord
bot.on('guildMemberAdd', (member) => {
	// Variables
	let guild = member.guild;
	console.log('Welcome to ' + member.guild.name + ', ' + member.user.username + '! Have fun, relax, enjoy the pixels, read the #rules, and remember to not drink the water.');
	// <#201037355732172810> is the channel for rules
	// Send message to default channel when user joins
	guild.channels.get(guild.id).send('Welcome to ' + member.guild.name + ', ' + member.user.username + '! Have fun, relax, enjoy the pixels, read the <#201037355732172810>, and remember to not drink the water.');
});

// In a setTimeout so things don't get hammered super hard.
bot.on('message', (message, member) => {
	setTimeout(function() {
	// Variables
	let prefix = '!';
	let text = message.content;
	let channel = message.channel;
	let dm = message.author;
	
	// Logic
	let flag = text.replace(/(!wave\s)/ig, '');
	// let hmm = /hm{1,}\b/ig;
	// let commands = /(!help|!quote|!resources|!3|!euh)/g;
	
	// Quote Machine Array
	// When adding a quote with double quotation marks, preceed them with a \ or just use smart quotes like a human
	let quoteList = [
		{ quote: 'Pachinko is ded. Rot in rip Pachinko.', author: 'Shinbs' },
		{ quote: 'Anyone porn before 2002?', author: 'Afrosamasenpai' },
		{ quote: 'You blew my mind Tails. I didn’t even give you consent.', author: 'Luka' },
		{ quote: 'Widen you legs for Jesus!', author: 'Roy4ls' },
		{ quote: 'Nah, I’m a classy PL Whore. I do it in the comfort of my own home...or in a three-star or higher motel.', author: 'Lorezno' },
		{ quote: 'Das some mighty booty.', author: 'Onis' },
		{ quote: 'I can feel you breathing.', author: 'Tails' },
		{ quote: 'I sometimes can’t even sit on the motorcycle seat without burning my ass lmao.', author: 'GATH' },
		{ quote: 'That’s enough water for one day. *throws in pile of dead bodies*', author: 'Que' },
		{ quote: 'You shut up, I still havent had any chapters and my symptoms are going CRAZY!', author: 'Rage' },
		{ quote: 'Damn you adult responsibilities.', author: 'Midlight Dragoon' },
		{ quote: 'Blame Luka for my death.', author: 'Afrosamasenpai' },
		{ quote: 'I want that in and around my mouth.', author: 'Afrosamasenpai' },
		{ quote: 'Chilly. It’s almost 72 degrees!', author: 'Luka' },
		{ quote: 'If I find any inline styleing on these PHP pages-I’m going to hunt you down...', author: 'theredheadhenry' },
		{ quote: '3 is my limit, then it’s Mr. Snippy.', author: 'KnightGrave' },
		{ quote: 'Didn’t Que sentence you to endless days in the Hyperbolic Time Chamber?', author: 'EnteiTheHedgehog' },
		{ quote: 'YOU NEED TO CHILL!', author: 'RighteousAJ' },
		{ quote: 'I have a diarrhea today.', author: 'Roy4ls' },
		{ quote: 'My brother played 24 hours of that for a video to be made as a bet between him and a friend. He never recovered.', author: 'OshikaruSensei' },
		{ quote: 'Here is a quote for the thing.', author: 'theredheadhenry' },
		{ quote: 'It’s 7pm, time for bed.', author: 'theredheadhenry' },
		{ quote: 'Ass magic is best magic.', author: 'Midlight Dragoon' },
		{ quote: 'I find myself shoving inflatable dicks into my anus.', author: 'Dr. Blastrider' },
		{ quote: 'Law of the jungle, baby!', author: 'RighteousAJ' },
		{ quote: 'I got the booty.', author: 'RighteousAJ' },
		{ quote: 'You begin the night with “having sex” and it ends with “camping”.', author: 'Blues Light' },
		{ quote: 'I HATE THE FUTURE! ITS FULL OF MYSTERY! I HATE MYSTERIES! I HAD TO BUY SO MANY SCOOBY SNACKS', author: 'Dr. Simetra' },
		{ quote: 'I’m going to hunt you down and gut you like a fish if you don’t come back Kris. I’m serious, plane tickets and Bowie knives are cheap these days.', author: 'Nexus' },
		{ quote: 'I don’t know. I’m just sitting here, naked and bored.', author: 'ReiNekura' },
		{ quote: 'She’s cute and fun, but no my kind of girlfriend. I love her...but like a sister - who has rockin’ tits.', author: 'Johnny' },
		{ quote: 'I haven’t sprited in 2 years either soooo I’m pretty certain I suck ass. Speaking of sucking ass, not a jolly experience to try.', author: 'Blade' },
		{ quote: 'Aye you got me, tis I, Angryboy all along *sips on tea* Seto has just been a fake account this whole time. I mean, Australians can’t sprite...they’re prisoners for crying out loua HA HA HA *bites crumpet*', author: 'Blues Light' },
		{ quote: 'Understandably, getting your face erased to see if asteroids taste like fruit is a rather weird proposition.', author: 'Afrosamasenpai' },
		{ quote: 'Because I’m managing an RP, playing BT3, and MASTURBATING! I CANNOT MULTITASK BEYOND THAT!', author: 'Lorezno' },
		{ quote: 'Wow, you just going to hoe me out like that?', author: 'KazzyKun' },
		{ quote: 'You sound like Scooby-Doo. Uh-oh, Raggy.', author: 'AnaseSkyrider' },
		{ quote: 'Gotta straddle that horse like a bacon sunday morning.', author: 'KazzyKun' },
		{ quote: 'Make people sing with a dick in the ass', author: 'Rage' },
		{ quote: 'No such thing in surprise DICKINYOURASS', author: 'Rage' },
		{ quote: 'Fuck the assholes that upload raw versions and fuck their raw assholes', author: 'Rage' },
		{ quote: 'Good god man stop stealing my bit, it’s all I’ve got!', author: 'Nexus' },
		{ quote: 'They dun call you mr doughnut for nothing.', author: 'LanceMaster' },
		{ quote: 'Wow. I see how it is. What, were just calling people nerds now?', author: 'UnboundBeatz' },
		{ quote: 'I’m tired right now, don’t judge my words.', author: 'Dr. Blastrider' },
		{ quote: 'You act like my paper white ass owns timbs.', author: 'Yahn' },
		{ quote: 'Hug the abs.', author: 'ReiNekura' },
		{ quote: 'German rap is like summoning a demon.', author: 'Roy4ls' },
		{ quote: 'It’s friday so he might be wanking his xenoverse with razzlin.', author: 'LanceMaster' },
		{ quote: 'Everytime I poop i get sad.', author: 'theredheadhenry' },
		{ quote: 'Please kill me if I ever mature as a person.', author: 'Dr. Simetra' },
		{ quote: 'Yo, I got 99 bacon slices and Afro ate all of them.', author: 'Tails' },
		{ quote: 'Though we all know what happens at the end now thanks to POOR PLANNING BY BRIAN FUCKFACE MICHAEL DOUCHEBAG BENDIS', author: 'Luka' },
		{ quote: 'Quote machine of quoting the quoted quotes of the quote machine’s quote machine', author: 'SuperFantasticoBananos' },
		{ quote: 'I just want to one day have a quote lol Then my life at Vortex is complete.', author: 'Mageta' },
		{ quote: 'I hope my butt burns a fiery death as well.', author: 'Roy4ls' },
		{ quote: 'I can barely support my own life, man.', author: 'Thal' },
		{ quote: 'Well, this is Bullshit Island!!!! Oh wait- no it’s not. I retract that poorly executed joke.', author: 'Luka'},
		{ quote: 'We all know that the best part is getting everything wrong.', author: 'Thal' }
	];
	
	// Select which quote to be used at random
	let whichQuote = Math.round( Math.random() * ( quoteList.length - 1 ));
	
	// Embeds
	// Resources Embed
	const resources = new Discord.RichEmbed()
		// Vortex Resources from Getting Started: Spriting for Dummies
		.setColor('#641aa3')
		.setTitle('Resources')
		// Database GIF
		.setImage('http://i.imgur.com/uUPtBTN.gif')
		// Description for the info
		.setDescription('It has occured to me that we do not have a go-to topic for people starting out, just ones spread out among the boards that get lost over time. Since the forum won’t be here forever, it’s now a bot command! It is our job to see that they get started out on the right foot, instead of lost in the dark like a drunken babe. \n\nDon’t hesitate to dump some more resources at Afro. Unless he’s wrasslin’.')
		// Databases
		// Each fields is its own block. Keep them inline. without breaks and use a \n for line breaks.
		.addField('Contributed Databases', '[YB’s & ’Fro’s DBZ Collection](https://www.dropbox.com/sh/gm410186fy7whoo/AAB90TIduqT2C68C97NOioSqa) \n[MadCX’s Database of Customs](https://www.dropbox.com/sh/2a6xzb8utnwzcjh/AADW3x8DrnqZrl9dJ2AQDb7Pa?dl=0) \n[Backgrounds!](https://www.dropbox.com/sh/iz8rig9f1q03rt1/AADgDl7loX6F0QpISAcyHMeIa) \n[Effects!](https://www.dropbox.com/sh/bkhl7r5z82z29zs/AAAp_HZL2_Nc-PNKPtTDz8G4a) \n[RPG Maker Bases](https://www.dropbox.com/sh/wxxclk930hevtt3/AADkcuw_VUKgHfMLe2cV6wcTa?dl=0)')
		.addField('Bases and Tutdonvm orials', '[Need a base tutorial? Here’s one by Seto](http://i.imgur.com/rZ5uOcv.png) \n[Need a base tutorial... *IN VIDEO FORM?!* Here’s one by AB](https://www.youtube.com/watch?v=IY9hIkE7jRE) \n[Need a basic spriting tutorial? Here’s one by Phanny](http://pre05.deviantart.net/de58/th/pre/i/2016/096/4/5/lsw_sprite_tutorial_by_braddyapples-d9xxral.png) \n[Need a style conversion tutorial? Here’s one by Chef](http://i59.tinypic.com/263khg8.png) \n[Want some LSWi? Here’s AB’s Photobucket library](http://s307.photobucket.com/user/ab_vortex/library/sprites/lswi) \n[DB Universe Sheets](https://www.dropbox.com/sh/gm410186fy7whoo/AAB90TIduqT2C68C97NOioSqa) \n[Need a base tutorial? Here’s one by Entei](https://cdn.discordapp.com/attachments/269272649354444800/315965119525945354/unknown.png)')
		.addField('Animation Tutorials', '[Darkstalkers and the Twelve Principles of Animation](http://art-eater.com/2010/07/test-1-darkstalkers/) \n[Making Fluid and Powerful Animations For Skullgirls](https://www.youtube.com/watch?v=Mw0h9WmBlsw)')
		.addField('Anatomy', '[Line of Action (Figure Drawing)](https://line-of-action.com/practice-tools/figure-drawing/) \n[Basic Anatomy? Legs looking weird? Check this out this Imgur album to draw everything](http://imgur.com/a/Fyx0e?gallery) \n[Google Drive folder full of faces](https://drive.google.com/folderview?id=0B8XR5dxrltiaTURoZXBTS0V2RHc) \n[Proko (Anatomy)](http://www.proko.com/library/) \n[CroquisCafe (YouTube channel with videos on Anatomy)](https://www.youtube.com/channel/UCAZZ8kXStsAD_SJS9LWNdEQ)')
		.addField('Vortex Logo', '[.PSD file](https://www.dropbox.com/s/i408t1mfay5toek/vortex-logos.psd?dl=0) \n[.AI file](https://www.dropbox.com/s/mj608yq290imh45/vortex-logos.ai?dl=0)');
	
	// Quotes Embed
	const quotes = new Discord.RichEmbed()
		// Spit out a random quote in a channel
		.setColor('#641aa3')
		.setDescription('“' + quoteList[whichQuote].quote + '” \n — ' + quoteList[whichQuote].author);
		
	// Exit if message comes from any box
	if (message.author.bot) 
		return false;
	
	console.log('Message: ' + text);
	console.log('Author: ' + message.author.username);
	console.log('Channel: ' + channel.name);
	console.log('---');
	
	// Help commands so people know how to things.
	if (text.startsWith(prefix + 'help')) 
		dm.send('```!resources\nA list of resources!\n\n!quote\nA random quote from these putzes!\n\n!3\nPraise the almighty 3!\n\n!wave <thing>\nWaves a flag of encouragement!```') ;
	
	// Resources 
	if (text.startsWith(prefix + 'resources')) 
		// Spit out the embed into a PM (dm so it goes to the user and not the channel it was posted in)
		// When sending embeds with send() use empty string and object or else it borks and tries to throw a promise as a string
		dm.send('', {embed: resources});
	
	// Praise 3, as is tradition.
	if (text.startsWith(prefix + '3')) 
		channel.send('\\\\[T]/ Praise 3! \\\\[T]/');
	
	// Question EUH as is tradition.
	if (text.startsWith(prefix + 'euh')) 
		channel.send('What’s EUH?') ;
	
	// Wave flag of encouragement
	if (text.startsWith(prefix + 'wave'))
		// console.log(flag);
		// Default to productivity flag if flag returns 'empty'
		(flag === '!wave') ? 
			channel.send(message.author + ' waved the productivity flag! You can do it!'):
			channel.send(message.author + ' waved the ' + flag + ' flag! You can do it!');
	
	// Rotating quotes
	if (text.startsWith(prefix + 'quote'))
		channel.send('', {embed: quotes});
	
	// No more because we can't have nice things
	// if (hmm.test(text) || (!commands.test(text) && !hmm.test(text) )) {
	
	// 	// Remove the H with the split
	// 	let findHmm = text.split(/(hm*m)/i);
	// 	let foundHmm = findHmm[1];
	// 	let m = foundHmm.replace(/[^m]/i, '');
	// 	// Double up the amount of Ms originally given
	// 	let howManyM = m.repeat(2);
	
	// 	// Now for the Hmm messages
	// 	if (m.length > '60' && m.length < '100') 
	// 		channel.send('Hmm^∞').catch(console.error);
			
	// 	if (m.length >= '100' && m.length < '200') 
	// 		channel.send('Hmm^∞^∞*∞').catch(console.error);
			
	// 	if (m.length >= '200')
	// 		channel.send('C’mon dude, seriously?').catch(console.error);
		
	// 	// Maybe set up a list if added back?
	// 	if (message.author.id === '201042025368256512')
	// 		channel.send('No! Bad kitty!').catch(console.error);
			
	// 	else
	// 		channel.send('H' + howManyM + '.').catch(console.error);
	// }
			
	}, timer);
});