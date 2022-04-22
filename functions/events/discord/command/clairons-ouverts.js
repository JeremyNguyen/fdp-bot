const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const author = context.params.event.member.user.username;
console.log(author + ' /clairons-ouverts');

const url_clairons_ouverts = 'https://media.discordapp.net/attachments/796837101601554454/938471834310041650/clairons-ouverts.jpg';

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `${url_clairons_ouverts}`
});

