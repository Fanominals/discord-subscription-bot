import { backupMessage, errorMessage } from "../../messages/messages.js";
import fs from "node:fs/promises";
import { constants } from "node:buffer";

export const purge = async (data) => {
  if (!data.member.permissions.has('Administrator')) return errorMessage(data, "You don't have permission!")

  const collection = data.usersCollection;
  const members = (await (data.guild.members.fetch()))


  // const membersWithoutRoles = members.filter(member => member.roles.highest.rawPosition == "0")
  // await membersWithoutRoles.forEach(async (member) => {
  //   console.log(member);
  //   await data.guild.members.addRole({ user: member, role: data.guild.roles.cache.get("1066299999253712967"), reason: "Moving" }
  //   )
  // })


  const donatorRole = await data.guild.roles.cache.get("1090105739818827907");
  const memberWithRoles = members.filter((member) => member.roles.cache.has("1090105739818827907"));

  let counter = 0;
  memberWithRoles.forEach(async (member) => {
    const inDatabase = await collection.findOne({ userId: `${member.id}` })
    if (!inDatabase) {
      counter++
      console.log(`${member.user.tag} is not a donator. Removed roles!`);
      await data.guild.members.removeRole({ user: member, role: donatorRole, reason: "Trial Expired!" })
    }
  });

  console.log(`${counter} users not in database.`)
  return;
};


