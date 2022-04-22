const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const author = context.params.event.member.user.username;
const replique = context.params.event.data.options[0].value;
console.log(author + ' /fdp-sarcasm');

let sarcasm = "";

for (var i = 0; i < replique.length; i++) {
  const char = replique.charAt(i);
  sarcasm += i%2 != 0 ? char.toUpperCase() : char.toLowerCase()
}

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `*${sarcasm}*`
});