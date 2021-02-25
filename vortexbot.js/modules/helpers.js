`use strict`;

import files from 'fs';
import Discord from 'discord.js';
import AWS from 'aws-sdk';
import { s3Config, bucketName } from './constants.js';
const bot = new Discord.Client();

export const memeChecker = async ( message, updateMessage = message, emit = false ) => {

	const hasUrl = message.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/) !== null

	const time = 5000;
	const checkEmbedTypes = async () => {
		try {
			return await updateMessage.embeds.map( embed => embed.type );
		} catch (error) {
			console.log(error);
		}
	}
	const checkRichEmbed = updateMessage.embeds.map( embed => ( embed?.image !== null ) || ( embed?.video !== null) );
	const embedHasImageOrVideo = checkRichEmbed.includes(true);

	if (!message.channel.name?.includes(`meme`)) return false;

	try {
		const types = await checkEmbedTypes();
		const hasLink = types.includes( `link` );
		const hasArticle = types.includes( `article` );
		const hasRich = types.includes( `rich` );
		const hasGifv = types.includes( `gifv` );
		const hasVideo = types.includes( `video` );
		const hasImage = types.includes( `image` );
		
		const hasGifvVideoImage = (hasGifv || hasImage || hasVideo );
		const hasLinkArticle = !hasGifvVideoImage;
		const hasAttachments = updateMessage.attachments.size > 0;

		if (!emit && (hasAttachments || types.length >= 1 && embedHasImageOrVideo || hasGifvVideoImage)) {
			return false;
		} else if (!emit && (hasUrl && types.length === 0) ) {
			bot.emit(`messageUpdate`, message, updateMessage);
		} else if (emit && hasGifvVideoImage || embedHasImageOrVideo || updateMessage.edits.length !== 0 && hasAttachments) {
			return false;
		} else {
			const deletedMessage = await updateMessage.delete();
			const warningMessage = await deletedMessage.channel.send(`ONLY MEME`);
			warningMessage.delete({ timeout: time })
		}
	} catch(error) {
		updateMessage.channel.send(`LET ME DELETE STUFF YO`)
	}
}

export class S3 {
	constructor() {
		this.bucket = bucketName
	}

	async get(fileName) {
		if (!fileName) return false;

		const options = {
			Bucket: this.bucket, 
			Key: fileName,
		};

		const S3 = new AWS.S3(s3Config);
		const data = await S3.getObject(options).promise();

		try {
			return JSON.parse(data.Body.toString('utf-8'));
		} catch (err) {
			console.error(err);
		}
	}

	async upload(fileName, file) {
		if (!fileName) return false;

		const options = {
			Bucket: this.bucket, 
			Key: fileName,
			Body: file,
			ContentType: 'application/json',
			Expires: 60,
		};

		const S3 = new AWS.S3(s3Config);

		try {
			await S3.upload(options).promise();
		} catch (err) {
			console.error(err);
		}
	}
}

export const fetchQuotes = async () => {
	const s3 = new S3();

	try {
		return await s3.get(`quotes.json`);
	} catch (err) {
		console.error(err);
	}
}
