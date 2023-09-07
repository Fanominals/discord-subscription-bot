import { errorMessage, redeemNotificationMessage, redeemSuccessMessage } from "../../messages/messages.js";
import config from "../../config.json" assert { type: "json" };

export const redeemCodes = async (data) => {


  const codesCollection = data.codesCollection;
  const usersCollection = data.usersCollection;
  const code = data.args[1];

  // const date = new Date();
  // if (!data.member.permissions.has("Administrator")) {
  if (!!(await usersCollection.findOne({ userId: data.user.id })))
    return await errorMessage(data, "You already have an active subscription!");
  // } else {
  // console.log("Is Admin");
  // }

  const codeData = (await codesCollection.findOneAndDelete({ code: code }))
    .value;

  // console.log('deleted code!')
  // console.log(codeData);

  if (!codeData) return await errorMessage(data, "Code is Invalid!");

  await usersCollection.insertOne({
    guildId: data.guild.id,
    userId: data.user.id,
    code: codeData.code,
    added: Date.now(),
    expiration: Date.now() + codeData.duration,
  });

  await data.guild.members.addRole({ user: data.member, role: config.role });
  console.log("added role");

  if (codeData.duration > 1000 * 60 * 5) {
    await redeemNotificationMessage(data, config.notificationChannel, codeData);
  }
  return await redeemSuccessMessage(data, codeData);

  //   const event = new Date(Date.now() + codeData.duration);
  //   console.log(event.toString());

};


