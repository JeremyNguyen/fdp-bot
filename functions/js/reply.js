
function hasKeyword(message, keywords) {
  const messageWords = message.toLowerCase().split(' ');
  const hasKeyword = keywords.some(keyword => messageWords.includes(keyword));
  const rand = Math.floor(Math.random() * 5);
  return hasKeyword ? rand === 1 : false;
}

function randomReply() {
  const rand = Math.floor(Math.random() * 20);
  return rand === 1;
}

function getUserFromUsername(username) {
  switch (username) {
    case 'Biboundee':
      return 'bib';
    case 'Phila':
      return 'phila';
    case 'Stormylol':
      return 'nano';
    case 'Annaka':
      return 'annaka';
    case 'chamw':
      return 'niko';
    case 'Neko':
      return 'kaimz';
  }
}

function getRandomUser(users) {
  return users[Math.floor(Math.random() * users.length)];
}

function getRandomReplique(repliques) {
  if (repliques.length > 0) {
    return repliques[Math.floor(Math.random() * repliques.length)];
  } else {
    return {replique: 'Replique not found'};
  }
}

module.exports.randomReply = randomReply;
module.exports.hasKeyword = hasKeyword;
module.exports.getUserFromUsername = getUserFromUsername;
module.exports.getRandomUser = getRandomUser;
module.exports.getRandomReplique = getRandomReplique;
