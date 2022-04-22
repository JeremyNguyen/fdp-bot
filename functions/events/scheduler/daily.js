const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

var lastIncidentDate = new Date("01/13/2022");
var now = new Date();
const diff = (now.getTime() - lastIncidentDate.getTime()) / (1000 * 3600 * 24);

await lib.discord.channels['@0.3.0'].update({
  channel_id: `179069879897292800`,
  name: `"${Math.floor(diff)}" jours sans incident sur discord`
});
