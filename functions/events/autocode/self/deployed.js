// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

lib.discord.users['@0.2.0'].me.status.update({
  activity_name: `excuses & mauvaise foi`,
  activity_type: 'LISTENING',
  status: 'ONLINE'
});

