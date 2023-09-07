import { manager } from "../manager.js";
import { generateCodes } from "./admin/generate.js";
import { clearCodes } from "./admin/clear.js";
import { listCodes } from "./admin/list.js";
import { manageUser } from "./admin/manage.js";
import { backupUsers } from "./admin/backup.js";
import { purge } from "./admin/purge.js";
import { redeemCodes } from "./user/redeem.js";
import { licenseInfo } from "./user/info.js";
import { syncUser } from "./user/sync.js";
import { trial } from "./user/trial.js";

// const data = {
//     message: message,
//     user: message.author,
//     args: args,
//     command: args[0].substring(config.prefix.length),
//     commandPrefix: args[0].substring(0, config.prefix.length),
//     codesCollection: codesCollection,
//     usersCollection: usersCollection,
//   };

export const commandHandler = async (data) => {
  try {
    if (data.command === "license") {
      if (data.args[1].toLowerCase() === "generate") {
        generateCodes(data);
      } else if (data.args[1].toLowerCase() === "clear") {
        clearCodes(data);
      } else if (data.args[1].toLowerCase() === "list") {
        listCodes(data);
      } else if (data.args[1].toLowerCase() === "info") {
        await licenseInfo(data);
      } else if (data.args[1].toLowerCase() === "manage") {
        manageUser(data);
      } else if (data.args[1].toLowerCase() === "sync") {
        await syncUser(data);
      } else if (data.args[1].toLowerCase() === "backup") {
        backupUsers(data);
      } else if (data.args[1].toLowerCase() === "purge") {
        await purge(data);
      }
    }

    if (data.command === "redeem") {
      await redeemCodes(data);
    }

    if (data.command === "trial") {
      await trial(data);
    }
  }
  catch (error) { console.log(error) }

};
