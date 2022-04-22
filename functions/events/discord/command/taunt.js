const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const reply = require ('../../../js/reply');

const userName = reply.getUserFromUsername(context.params.event.member.user.username);
const user = context.params.event.data.options.length > 0 ? context.params.event.data.options[0].value : null;

console.log(userName + ' /taunt ' + user);

let repliqueRequest;
if (user) {
  repliqueRequest = {
    baseId: process.env.BASE_ID,
    table: 'repliques',
    where: [
      {
        'user__is': user
      }
    ],
  };
} else {
  repliqueRequest = {
    baseId: process.env.BASE_ID,
    table: 'repliques',
    where: [
      {
        'user__not': userName
      }
    ],
  };
}

const repliquesResponse = await lib.airtable.query['@1.0.0'].select(repliqueRequest);
const repliquesRecords = repliquesResponse.rows;
const repliques = repliquesRecords.map(record => {
  return {id: record.fields.id, replique: record.fields.replique, user: record.fields.user, author: record.fields.author};
});

const replique = reply.getRandomReplique(repliques);

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `*${replique.replique}*`
});