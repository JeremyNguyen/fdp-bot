const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const status = require ('../../../../js/status');

let streamers = await lib.utils.kv.get({
  key: 'streamers'
});

if (!streamers) {
  streamers = [];
}

const isStreaming = context.params.event.self_stream;
const user = context.params.event.member.user.username;

if (isStreaming) {
  streamers.push(user);
  const streamingMsgAndStatus = status.getStreamingMsgAndStatus(user);
  const watchingStatus = {
    activity_name: streamingMsgAndStatus.status,
    activity_type: 'WATCHING',
    status: 'ONLINE'
  };
  await lib.discord.users['@0.2.0'].me.status.update(watchingStatus);
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: process.env.GENERAL_ID,
    content: streamingMsgAndStatus.msg,
  });
} else {
  if (streamers.includes(user)) {
    await lib.discord.users['@0.2.0'].me.status.update(status.defaultStatus);
  }
  streamers = streamers.filter(streamer => streamer !== user);
}

await lib.utils.kv.set({
  key: 'streamers',
  value: streamers
});

