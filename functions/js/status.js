const defaultStatus = {
  activity_name: `excuses & mauvaise foi`,
  activity_type: 'LISTENING',
  status: 'ONLINE'
};

const maintenanceStatus = {
  activity_name: `Maintenance`,
  status: 'DND'
};

function getStreamingMsgAndStatus(user) {
  switch (user) {
    case 'Biboundee':
      return {msg: 'Propnight pro 4k MMR is live !', status: 'raw talent'};
    case 'Phila':
      return {msg: 'Des jpegs ou des putes ? Je suis curieux ...', status: 'chasse & pêche'};
    case 'Stormylol':
      return {msg: `Omg Nano qui stream...\nhttps://cdn.discordapp.com/attachments/796837101601554454/938761677485268992/unknown.png`, status: 'Nano 🤦‍♂🤦‍♂🤦‍♂'};
    case 'Annaka':
      return {msg: 'Hum ça sent la mauvaise foi, j\'vais aller voir ...', status: 'Death Simulator'};
    case 'chamw':
      return {msg: 'Oof, le trou d\'balle de Phila en 720p let\s gooo ', status: 'Sexe non consenti'};
    case 'Neko':
      return {msg: 'J\air peur de join ce stream :eyes:', status: 'Pascal le grand frère'};
  }
}

module.exports.defaultStatus = defaultStatus;
module.exports.maintenanceStatus = maintenanceStatus;
module.exports.getStreamingMsgAndStatus = getStreamingMsgAndStatus;
