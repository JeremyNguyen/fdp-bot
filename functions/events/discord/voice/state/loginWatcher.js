const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let connections = await lib.utils.kv.get({
  key: 'connections'
});

const bibDisconnectMsgs = [
  'Allez l\'autre qui part en juif ...',
  'S\'est encore endormi l\'autre enculé',
  'Alors, infidèle ? On s\'en va sans dire au revoir ?',
  'De la part de Bib : "Bonne nuit les pds"'
];

const bibNanoConnectMsgs = [
  'Mate-les ces deux pédés à se co en même temps',
  'T\'es prêt Nano ? à "3" on se co ... 1 ... 2 ... 3 !',
  'Les deux homosexuels qu\'arrivent ensemble'
];

const user = context.params.event.member.user.username;
const channelId = context.params.event.channel_id;

/** Bib disconnects **/
if (user === 'Biboundee') {
  let hour = new Date().getHours();
  if (!channelId && hour < 5) {
    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: process.env.GENERAL_ID,
      content: bibDisconnectMsgs[Math.floor(Math.random() * bibDisconnectMsgs.length)],
    });
  }
}

/** Bib & Nano connect **/
if (user === 'Biboundee' || user === 'Stormylol') { 
  if (channelId) {
    connections.push({user: user, channelId: channelId});
    if (inSameChannel(user, channelId, connections)) {
      connections = [];
      await lib.discord.channels['@0.0.6'].messages.create({
        channel_id: process.env.GENERAL_ID,
        content: bibNanoConnectMsgs[Math.floor(Math.random() * bibNanoConnectMsgs.length)],
      });
    }
  } else {
    connections = connections.filter(connection => connection.user !== user);
  }
  await lib.utils.kv.set({
    key: 'connections',
    value: connections
  });
}

function inSameChannel(user, channelId, connections) {
  return connections.some(connection => connection.user !== user && connection.channelId === channelId);
}