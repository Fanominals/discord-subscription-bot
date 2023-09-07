import { errorMessage, syncUserMessage } from "../../messages/messages.js";
import config from "../../config.json" assert { type: "json" };

export const syncUser = async (data) => {
  const collection = data.usersCollection;
  if (await data.member.roles.cache.has(config.role)) {
    return await syncUserMessage(data, "You already have the appropriate role!");
  }
  console.log("doesn't have role");
  if (await collection.findOne({ userId: `${data.user.id}` })) {
    await data.guild.members.addRole({ user: data.user.id, role: config.role });
    return await syncUserMessage(data, `<@${data.user.id}> successfully synced!`);
  }
  return await syncUserMessage(data, `You do not have an active subscription!`);

  // console.log(error);
};
