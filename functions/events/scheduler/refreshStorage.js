const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const keywordsResponse = await lib.airtable.query['@1.0.0'].select({
  baseId: process.env.BASE_ID,
  table: 'keywords',
});
const keywordsRecords = keywordsResponse.rows;
const keywords = keywordsRecords.map(record => record.fields.keyword);

await lib.utils.kv.set({
  key: 'keywords',
  value: keywords
});

/*

const repliquesResponse = await lib.airtable.query['@1.0.0'].select({
  baseId: process.env.BASE_ID,
  table: 'repliques'
});
const repliquesRecords = repliquesResponse.rows;
const repliques = repliquesRecords.map(record => {
  return {id: record.fields.id, replique: record.fields.replique, user: record.fields.user, author: record.fields.author};
});

await lib.utils.kv.set({
  key: 'repliques',
  value: repliques
});

await lib.utils.kv.set({
  key: 'connections',
  value: []
});

*/

console.log('Refreshed storage');
