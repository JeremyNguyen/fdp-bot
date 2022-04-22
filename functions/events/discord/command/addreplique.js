const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const user = context.params.event.data.options[0].value;
const replique = context.params.event.data.options[1].value;
const author = context.params.event.member.user.username;

console.log(author + ' /addreplique [' + user + '] [' + replique + ']');

await lib.airtable.query['@1.0.0'].insert({
  baseId: process.env.BASE_ID,
  table: 'repliques',
  fieldsets: [
    {
      replique: replique,
      user: user,
      author: author
    },
  ],
});

return;