const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const author = context.params.event.member.user.username;
console.log(author + ' /clairons-fermes');

const url_clairons_fermes = 'https://media.discordapp.net/attachments/796837101601554454/938471833924141056/clairons-fermes.jpg';

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `${url_clairons_fermes}`
});


