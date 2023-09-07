import { backupMessage, errorMessage } from "../../messages/messages.js";
import fs from "node:fs/promises";

export const backupUsers = async (data) => {
  if (!data.member.permissions.has('Administrator')) return errorMessage(data, "You don't have permission!")

  const collection = data.usersCollection;
  const licenses = await collection.find({});
  const backup = (await licenses.toArray()).map((l) => {
    return {
      guildId: l.guildId,
      userId: l.userId,
      code: l.code,
      added: l.added,
      expiration: l.expiration,
    };
  });
  console.log(backup);
  const date = new Date().toLocaleDateString("en-US").replaceAll("/", "");
  const fileName = `backup-${date}.json`;
  await fs.writeFile(`./backups/${fileName}`, JSON.stringify(backup));
  return backupMessage(data, fileName);
};


