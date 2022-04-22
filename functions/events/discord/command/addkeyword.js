const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const keyword = context.params.event.data.options[0].value;
const author = context.params.event.member.user.username;

console.log(author + ' /addkeyword [' + keyword + ']');

await lib.airtable.query['@1.0.0'].insert({
  baseId: process.env.BASE_ID,
  table: 'keywords',
  fieldsets: [
    {
      keyword: keyword,
      author: author
    },
  ],
});

return;