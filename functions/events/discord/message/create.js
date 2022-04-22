// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const reply = require ('../../../js/reply');

const keywords = await lib.utils.kv.get({
  key: 'keywords'
});

const randomReply = reply.randomReply();
const hasKeywords = reply.hasKeyword(context.params.event.content, keywords);
if (randomReply || hasKeywords) {
  const repliquesResponse = await lib.airtable.query['@1.0.0'].select({
    baseId: process.env.BASE_ID,
    table: 'repliques'
  });
  const repliquesRecords = repliquesResponse.rows;
  const repliques = repliquesRecords.map(record => {
    return {id: record.fields.id, replique: record.fields.replique, user: record.fields.user, author: record.fields.author};
  });
  const replique = reply.getRandomReplique(repliques);
  let body = {
    channel_id: context.params.event.channel_id,
    content: `*${replique.replique}*`,
  };
  if (hasKeywords) { 
    body['message_reference'] = {message_id: context.params.event.id};
  }
  await lib.discord.channels['@0.0.6'].messages.create(body);
}
