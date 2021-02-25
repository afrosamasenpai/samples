`use strict`;

export const prefix = `!`;
export const embedColor = `#641aa3`;
export const embedFooter = {
	footer: {
		text: `VortexBot`,
		icon_url: `https://i.imgur.com/bYdejC5.png`,
	}
};
export const botToken = process.env.DISCORD_BOT_TOKEN;
export const s3Config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    'region': 'us-east-1',
};
export const bucketName = process.env.S3_BUCKET_NAME;
export const rulesChannel = `#201037355732172810`;