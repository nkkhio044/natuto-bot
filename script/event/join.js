module.exports.config = {
  name: "joinNoti",
  version: "1.0.1",
  dependencies: {
      "fs-extra": "",
      "path": "",
      "pidusage": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif");
  if (existsSync(path)) mkdirSync(path, { recursive: true }); 

  const path2 = join(__dirname, "cache", "joinGif", "randomgif");
  if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

  return;
}


module.exports.handleEvent = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
      api.changeNickname(`kazuma lvl.69`, threadID, api.getCurrentUserID());
      const fs = require("fs");
      return api.sendMessage("", event.threadID, () => api.sendMessage({body: "𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱\n\n𝗻𝗼𝘄 𝘆𝗼𝘂𝗿 𝗴𝗿𝗼𝘂𝗽 𝗰𝗮𝗻 𝘂𝘀𝗲 𝗯𝗼𝘁\n\n𝗽𝗿𝗲𝗳𝗶𝘅: >\n𝗼𝘄𝗻𝗲𝗿: Jazer Dmetriov\n𝗼𝘄𝗻𝗲𝗿𝗹𝗶𝗻𝗸: https://www.facebook.com/devs150\ntype ( >help ) (number of page ) to see available commands\nsay ( prefix ) to know the bot's prefix, then if u have a problem to the bot kindly dm me, or use callad to call the admin."} ,threadID));
  }
  else {
      try {
          const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
          let { threadName, participantIDs } = await api.getThreadInfo(threadID);

          const threadData = global.data.threadData.get(parseInt(threadID)) || {};
          const path = join(__dirname, "cache", "joinGif");
          const pathGif = join(path, `${threadID}.gif`);

          var mentions = [], nameArray = [], memLength = [], i = 0;

          for (id in event.logMessageData.addedParticipants) {
              const userName = event.logMessageData.addedParticipants[id].fullName;
              nameArray.push(userName);
              mentions.push({ tag: userName, id });
              memLength.push(participantIDs.length - i++);
          }
          memLength.sort((a, b) => a - b);

          (typeof threadData.customJoin == "undefined") ? msg = "Hello, {name}! Welcome to {threadName}. You're The {soThanhVien}th member of this groupChat." : msg = threadData.customJoin;
          msg = msg
          .replace(/\{name}/g, nameArray.join(', '))
          .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
          .replace(/\{soThanhVien}/g, memLength.join(', '))
          .replace(/\{threadName}/g, threadName);

          if (existsSync(path)) mkdirSync(path, { recursive: true });

          const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

          if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
          else if (randomPath.length != 0) {
              const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
              formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
          }
          else formPush = { body: msg, mentions }

          return api.sendMessage(formPush, threadID);
      } catch (e) { return console.log(e) };
  }
        }
