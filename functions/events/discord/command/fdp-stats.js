const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const author = context.params.event.member.user.username;
console.log(author + ' /fdp-stats');

const repliquesResponse = await lib.airtable.query['@1.0.0'].select({
  baseId: process.env.BASE_ID,
  table: 'repliques'
});
const repliquesRecords = repliquesResponse.rows;
const repliques = repliquesRecords.map(record => {
  return {id: record.fields.id, replique: record.fields.replique, user: record.fields.user, author: record.fields.author};
});

let contributors = {};
let quoted = {};

for (const replique of repliques) {
  const author = replique.author;
  const user = replique.user;
  if (contributors[author]) {
    contributors[author] = contributors[author] + 1;
  } else {
    contributors[author] = 1;
  }
  if (quoted[user]) {
    quoted[user] = quoted[user] + 1;
  } else {
    quoted[user] = 1;
  }
}

contributors = Object.entries(contributors);
contributors.sort((a, b) => b[1] - a[1]);

quoted = Object.entries(quoted);
quoted.sort((a, b) => b[1] - a[1]);

let contributors_msg = '> __Contributors :__';

for (const [i, [key, value]] of contributors.entries()) {
  contributors_msg += `\n> ${key}: ${value} ${i === 0 ? ':first_place:' : ''}`;
}

let quoted_msg = '> __Top quoted :__';

for (const [i, [key, value]] of quoted.entries()) {
  quoted_msg += `\n> ${key}: ${value} ${i === 0 ? ':first_place:' : ''}`;
}

let statsSection = `> **FDP-bot stats : **
> 
${contributors_msg}
> 
${quoted_msg}`;

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `> <@!${context.params.event.member.user.id}>,\n> \n${statsSection}`
});

