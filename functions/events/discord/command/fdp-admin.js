const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const status = require ('../../../js/status');

const options = context.params.event.data.options[0].value.split(' ');
const user = context.params.event.member.user.username;
const command = options.shift();

if (user === 'Biboundee') {
  switch(command) {
    case 'play':
      const repliquesResponse = await lib.airtable.query['@1.0.0'].select({
        baseId: process.env.BASE_ID,
        table: 'repliques'
      });
      const repliquesRecords = repliquesResponse.rows;
      const repliques = repliquesRecords.map(record => {
        return {id: record.fields.id, replique: record.fields.replique, user: record.fields.user, author: record.fields.author};
      });
      const replique = repliques.find(replique => replique.id == options[0]);
      if (replique) {
        await lib.discord.channels['@0.0.6'].messages.create({
          channel_id: context.params.event.channel_id,
          content: `*${replique.replique}*`,
        });
      }
      break;
      case 'impersonate':
        await lib.discord.channels['@0.0.6'].messages.create({
          channel_id: context.params.event.channel_id,
          content: options.join(' '),
        });
      break;
      case 'down':
        await lib.discord.users['@0.2.0'].me.status.update(status.maintenanceStatus);
        break;
      case 'up':
        await lib.discord.users['@0.2.0'].me.status.update(status.defaultStatus);
        break;
    default:
      break;
  }
}

return;