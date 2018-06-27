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
bot.on('message', message => {
	setTimeout( () => {
	// Variables
	let text = message.content;
	let channel = message.channel;
	let dm = message.author;
	
	// Logic
	let flag = text.replace(/(!wave\s)/ig, '');
	let quoteReplace = text.replace(/(!quote\s)/ig, '');
	let great = /officespace\.jpg\b/ig;
	let shrug = /shrug\.jpg\b/ig;
	let popcorn = /popcorn\.jpg\b/ig;
	let joke = /thatsthejoke\.jpg\b/ig;
	
	// Quote Machine Array
	// When adding a quote with double quotation marks, preceed them with a \ or just use smart quotes like a human
	let quoteList = [
		{ quote: 'Pachinko is ded. Rot in rip Pachinko.', author: 'Shinbs' },
		{ quote: 'Anyone porn before 2002?', author: 'Afrosamasenpai' },
		{ quote: 'You blew my mind Tails. I didn’t even give you consent.', author: 'Luka' },
		{ quote: 'Widen you legs for Jesus!', author: 'Roy4lz' },
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
		{ quote: 'Didn’t Que sentence you to endless days in the Hyperbolic Time Chamber?', author: 'Entei' },
		{ quote: 'YOU NEED TO CHILL!', author: 'RighteousAJ' },
		{ quote: 'I have a diarrhea today.', author: 'Roy4lz' },
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
		{ quote: 'German rap is like summoning a demon.', author: 'Roy4lz' },
		{ quote: 'It’s friday so he might be wanking his xenoverse with razzlin.', author: 'LanceMaster' },
		{ quote: 'Everytime I poop i get sad.', author: 'theredheadhenry' },
		{ quote: 'Please kill me if I ever mature as a person.', author: 'Dr. Simetra' },
		{ quote: 'Yo, I got 99 bacon slices and Afro ate all of them.', author: 'Tails' },
		{ quote: 'Though we all know what happens at the end now thanks to POOR PLANNING BY BRIAN FUCKFACE MICHAEL DOUCHEBAG BENDIS', author: 'Luka' },
		{ quote: 'Quote machine of quoting the quoted quotes of the quote machine’s quote machine', author: 'Squish' },
		{ quote: 'I just want to one day have a quote lol Then my life at Vortex is complete.', author: 'Mageta' },
		{ quote: 'I hope my butt burns a fiery death as well.', author: 'Roy4lz' },
		{ quote: 'I can barely support my own life, man.', author: 'Thal' },
		{ quote: 'Well, this is Bullshit Island!!!! Oh wait- no it’s not. I retract that poorly executed joke.', author: 'Luka'},
		{ quote: 'We all know that the best part is getting everything wrong.', author: 'Thal' },
		{ quote: 'Welp. If I’m gonna waste time with drugs, it might as well be through Luka’s brain.', author: 'AnaseSkyrider'},
		{ quote: 'platinum do good fighty', author: 'Midlight Dragoon'},
		{ quote: 'Is that.... is that bacon in Chibiusa’s hair?', author: 'Luka'},
		{ quote: 'This actually gives me chills and if you say otherwise you’re lying', author: 'Mini'},
		{ quote: 'If you give him Slayer moves I swear that diamond won’t be the hardest material on earth.', author: 'Thal'},
		{ quote: 'Is that hentai?', author: 'Nexus'},
		{ quote: 'Hey, I said that I’m eager for a war, not eager to participate.', author: 'Lorezno'},
		{ quote: 'Last time I tried doing traditional art, I tried clicking the undo button', author: 'Nexus'},
		{ quote: 'Bitch, I could eat fifteen burritos the size of a black guy’s dick.', author: 'AnaseSkyrider'},
		{ quote: 'We have the foreign element of Harley intruding on our Tokusentainicity', author: 'Luka'},
		{ quote: 'Ideas are welcome. Procrastination is expected.', author: 'Onis' },
		{ quote: 'I want my dick destroyed by her Berserker pussy', author: 'Rage' },
		{ quote: 'MY DINGUS WILL POWER THE FACTORIES AND THE NUKE BOMBS FILLED WITH SHEETS!', author: 'Rex' },
		{ quote: 'You can’t transcribe this ass so easily', author: 'Howly' },
		{ quote: 'HOLD ON WAT THE FUKING FUK you coming here telling me Hollywood is in californer, BUT NOT A STATE!?', author: 'LanceMaster' },
		{ quote: 'I WISH I WAS THE MOTEHRFUCKING DRAGON OF DOJIMA', author: 'Thal' },
		{ quote: 'That’s called adulting, also commonly referred to as Galeing.', author: 'Luka' },
		{ quote: 'As a color blind person I can say: OMFG MY EYES AAAAAAAA', author: 'LanceMaster' },
		{ quote: 'Pierogi are the bestest drug', author: 'Roy4lz' },
		{ quote: 'Oh man the black man hurricane isn’t coming?', author: 'Nexus' },
		{ quote: 'Why does his hair look like it’s gonna cause rain and lightning?', author: 'Ashiro' },
		{ quote: 'I’m not really like, good with long strokes', author: 'Blastrider' },
		{ quote: 'Won’t the horns make you go from legally fuckable puppy to legally fuckable horny puppy?', author: 'Thal' },
		{ quote: 'It’s hard to combo a child to death', author: 'Thal' },
		{ quote: 'I like being lonely and miserable, nobody to call me out on my shit or bother me', author: 'Nexus' },
		{ quote: 'Chat is going so fast no one will notice that I like wearing cute skirts', author: 'Citrus' },
		{ quote: 'Going to prison for attempt murder, is going to prison for failure', author: 'Howly' },
		{ quote: 'Every rule has an exception except the rule ‘every rule has an exception’ , which makes it an exception to the rule?' , author: 'Howly' },
		{ quote: 'Dont quote my stuff Afro. I know you are lurking.', author: 'Rage' },
		{ quote: 'No idea who this Billy Gunn is but he has my respect.', author: 'Thal' },
		{ quote: 'I was a pubic hair away from having to change diapers, man. I’m 17. I’m young. I’m animated. I’m alive. I dont need this shit.', author: 'Squishy' },
		{ quote: 'Bingo bango bongo wappa dada dada da da da, that’s an edgy character.', author: 'Dr. Blastrider' },
		{ quote: 'FUNIMATION MAN - Destined to save you and break you in one fell animation season.', author: 'Nexus' },
		{ quote: 'The schwing was so super effective, all were eliminated with no possible threats left, or was there!?' , author: 'Tails' },
		{ quote: 'Also fuck you and your discrimination against the tittily challenged.', author: 'AnaseSkyrider' },
		{ quote: 'We’d live in a world ran by... I dunno, insert whatever offends you personally.', author: 'Nexus' },
		{ quote: 'I’M DRINKING THAT MILK SO HARD, IT’S REPLACING MY SPERM', author: 'AnaseSkyrider' },
		{ quote: 'Hooray! It works!', author: 'Afrosamasenpai' },
		{ quote: 'Off topic but I wonder how batshit intense saiyan reproduction gets', author: 'Thewindyfan' },
		{ quote: 'YOU CAN STRIP ME OF MY WORDS BUT YOU CANT STRIP THE TRUTH IVE SPOKETH', author: 'Howly'},
		{ quote: 'I wish I was that good. I’ll get there tho. Can’t wait to draw hentai.', author:  'Jo the Animator'},
		{ quote: 'Because I’m a whore for Final Fantasy games', author: 'Midlight Dragoon'},
		{ quote: 'But I didn’t have a reason to mock you anymore. I mean, I still will, but you get my point', author: 'Yalashanda'},
		{ quote: 'Warning/Pro-top: don’t scratch my ear too hard like a butter knife', author: 'Entei'},
		{ quote: 'Yeah sweaters are love, sweaters are life', author: 'Citrus'},
		{ quote: 'Tails, life has these things called mystery. It is up to you solve them. Now here’s a test tube, a paperclip and a blank piece of paper. Solve X for the true parentage of Afro. My guess, space bacon pirates who left their son on Earth for safe keeping.', author: 'Nexus'},
		{ quote: 'To all my fellow people of color, see you niggas on the plantation.', author: 'KazzyKun'},
		{ quote: 'One thing that I’m not going to touch with this story is how the fuck can an alien race evolved on another planet turn out to look exactly like humans and be able to breed with them.', author: 'Thewindyfan'},
		{ quote: 'We could say that the bot went comma-tose', author: 'Thal'},
		{ quote: 'Living la vida Luka.', author: 'Ashiro' }
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
		.addField('Bases and Tutorials', '[Need a base tutorial? Here’s one by Seto](http://i.imgur.com/rZ5uOcv.png) \n[Need a base tutorial... *IN VIDEO FORM?!* Here’s one by AB](https://www.youtube.com/watch?v=IY9hIkE7jRE) \n[Need a basic spriting tutorial? Here’s one by Phanny](http://pre05.deviantart.net/de58/th/pre/i/2016/096/4/5/lsw_sprite_tutorial_by_braddyapples-d9xxral.png) \n[Need a style conversion tutorial? Here’s one by Chef](http://i59.tinypic.com/263khg8.png) \n[Want some LSWi? Here’s AB’s Photobucket library](http://s307.photobucket.com/user/ab_vortex/library/sprites/lswi) \n[DB Universe Sheets](https://www.dropbox.com/sh/gm410186fy7whoo/AAB90TIduqT2C68C97NOioSqa) \n[Need a base tutorial? Here’s one by Entei](https://cdn.discordapp.com/attachments/269272649354444800/315965119525945354/unknown.png)\n[Phanny’s Hair Tutorial](https://img00.deviantart.net/a6c1/i/2018/041/b/4/lsw_sprite_tutorial_002__hair_by_braddyapples-dc2rres.png)')
		.addField('Animation Tutorials', '[Pixel Art Tutorail Dump by MiniBoss (Pedro Medeiros)](http://blog.studiominiboss.com/pixelart) \n[Darkstalkers and the Twelve Principles of Animation](http://art-eater.com/2010/07/test-1-darkstalkers/) \n[Making Fluid and Powerful Animations For Skullgirls](https://www.youtube.com/watch?v=Mw0h9WmBlsw) \n[Duelyst Attack Animation Tutorial by Adam Kling](https://www.youtube.com/watch?v=iJOUTSy0fQI) \n[Pixel Art: Animation smoothness by Skaz](http://lost-fortress.com/index.php/2017/08/24/pixel-art-animation-smoothness/) ')
		.addField('Color Tutorials', '[Thinking in Color](http://finalbossblues.com/thinking-in-color/) \n[Hue Shifting by GDquest](https://youtu.be/RL_5va7jEx8) \n[Hue Shifting by Solar Lune](https://youtu.be/yRCTL0PA4X0)')
		.addField('Anatomy', '[Line of Action (Figure Drawing)](https://line-of-action.com/practice-tools/figure-drawing/)  \n[Google Drive folder full of faces](https://drive.google.com/folderview?id=0B8XR5dxrltiaTURoZXBTS0V2RHc) \n[Proko (Anatomy)](http://www.proko.com/library/) \n[CroquisCafe (YouTube channel with videos on Anatomy)](https://www.youtube.com/channel/UCAZZ8kXStsAD_SJS9LWNdEQ)')
		.addField('Vortex Logo', '[.PSD file](https://www.dropbox.com/s/i408t1mfay5toek/vortex-logos.psd?dl=0) \n[.AI file](https://www.dropbox.com/s/mj608yq290imh45/vortex-logos.ai?dl=0)');
	
	// Quotes Function
	const quoteMachine = list => {
	    let whichQuote = Math.round( Math.random() * ( list.length - 1 ));
		const quoteEmbed = new Discord.RichEmbed()
			// Spit out a random quote in a channel
			.setColor('#641aa3')
			.setDescription('“' + list[whichQuote].quote + '” \n — ' + list[whichQuote].author);
	
		channel.send('', {embed: quoteEmbed});
	}
		
	const officespaceEmbed = new Discord.RichEmbed()
		.setImage('https://media.makeameme.org/created/that-would-be-p5wfmj.jpg');
		
	const shrugEmbed= new Discord.RichEmbed()
		.setImage('https://cdn.discordapp.com/attachments/353322814973149204/394582959358869505/jNlijV3.png');
		
	const popcornEmbed = new Discord.RichEmbed()
		.setImage('https://cdn.discordapp.com/attachments/201028921695666177/397052914507448330/image.png');
		
	const jokeEmbed = new Discord.RichEmbed()
		.setImage('https://i.imgur.com/utzTCyo.png');

	const pierogiPorn = new Discord.RichEmbed()
		.setImage('https://farm9.staticflickr.com/8208/8214278997_4c4479a181_b.jpg');
		
	// Exit if message comes from any box
	if (message.author.bot) 
		return false;
	
	console.log('Message: ' + text);
	console.log('Author: ' + message.author.username);
	console.log('Channel: ' + channel.name + ' (type: ' + channel.type + ')');
	console.log('---');
	
	// Help commands so people know how to things.
	if (text === prefix + 'help' || text === prefix + 'commands') 
		dm.send('```!resources, !resources, or !r\nA list of resources!\n\n!quote <username>\nA random quote from these putzes!\n\n!3\nPraise the almighty 3!\n\n!wave <thing>\nWaves a flag of encouragement!```') ;
	
	// Resources 
	if ( text === prefix + 'resources' || text === prefix + 'resource' || text === prefix + 'r' ) 
		// Spit out the embed into a PM (dm so it goes to the user and not the channel it was posted in)
		// When sending embeds with send() use empty string and object or else it borks and tries to throw a promise as a string
		dm.send('', {embed: resources});
	
	// Praise 3, as is tradition.
	if (text === prefix + '3') 
		channel.send('\\\\[T]/ Praise 3! \\\\[T]/');
	
	// Question EUH as is tradition.
	if (text === prefix + 'euh') 
		channel.send('What’s EUH?');

	// DAMMIT HOWLY
	if (text === prefix + 'howly') 
		channel.send('Goddammit Howly!');
	
	// TOKUSENTAI
	if (text === prefix + 'team3star')
		channel.send('TOKUSENTAI!');

	// Mmm, pierogis
	if (text === prefix + 'pierogi')
		channel.send('', {embed: pierogiPorn});
	
	// Wave flag of encouragement
	// Needs to be in an actual server/guild to grab nickname. Does not trigger in DMs.
	if (message.guild != null) {
		let memberNickname = message.guild.member(message.author).displayName;
		
		if (text.startsWith(prefix + 'wave'))
		// Default to productivity flag if flag returns 'empty'
		(flag === '!wave') ? 
			channel.send('\:flag_black: ' + memberNickname + ' waved the productivity flag! You can do it!' + ' \:flag_black:'):
			channel.send('\:flag_black: ' + memberNickname + ' waved the ' + flag + ' flag! You can do it!' + ' \:flag_black:');
	} if (text.startsWith(prefix + 'wave') && message.guild === null && channel.type === 'dm') {
		channel.send('Sorry, you can’t wave here.');
	}
	
	// Productive 
	const noLoligagging = {};
	
	// Rotating quotes
	if (text.startsWith(prefix + 'quote')) {
		// If their ID shows up in loligagging object, tell them to go be productive
		if (noLoligagging[message.author.id]) {
			channel.send('Go be productive ' + noLoligagging[message.author.id] + '!');
		} else {
			// Set dump array
			var quoteSearchArray = [];
			
			// If returns the command, go with as normal
			if (quoteReplace === '!quote') {
				quoteMachine(quoteList);
			} else {
				// Loop through the main quote array to see if the user exists as an author
				for (var i = 0; i < quoteList.length; i++) {
					// If author exists, dump into array
					if (quoteList[i].author === quoteReplace)
						quoteSearchArray.push(quoteList[i]);
				}
				
				// If search is not empty, use the new array. If not, send back a reply.
				if (quoteSearchArray[0] !== undefined){
					quoteMachine(quoteSearchArray);
				} else {
					channel.send(quoteReplace + ' doesn’t seem to have a quote, dude.');
				}
			}
		}
	}
			
	if (great.test(text))
		channel.send('', {embed: officespaceEmbed});
		
	if (shrug.test(text))
		channel.send('', {embed: shrugEmbed});
		
	if (popcorn.test(text))
		channel.send('', {embed: popcornEmbed});
		
	if (joke.test(text))
		channel.send('', {embed: jokeEmbed});
		
	}, timer);
});