import {
  freeTrialDMMessage,
  freeTrialMessage,
  errorMessage,
} from "../../messages/messages.js";

import fs from 'fs/promises'

const config = JSON.parse(await fs.readFile("./config.json"));

export const trial = async (data) => {

  return errorMessage(data, `All Free Trials have been redeemed for today!\nCheck <#${config.pricingChannel}> to purchase.`)
  const trialsCollection = data.trialsCollection;
  const codesCollection = data.codesCollection;

  const userFound = await trialsCollection
    .find({ userId: `${data.user.id}` })
    .toArray();

  console.log(userFound);
  if (userFound.length > 0) {
    errorMessage(data, `Already claimed! Please see <#${config.pricingChannel}>`);
    return;
  }

  let codeData = "";
  const codeLength = Math.floor(Math.random() * 5) + 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let j = 0; j < codeLength; j++) {
    codeData += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  console.log(`${data.user.id} has redeemed trial with code: ${codeData}`);

  try {
    await freeTrialDMMessage(data, codeData);

  }
  catch {
    return errorMessage(data, "Unable to send a dm!")
  }

  await freeTrialMessage(data);
  codesCollection.insertOne({
    code: codeData,
    duration: 1000 * 60 * 3,
    trial: true,
  });
  trialsCollection.insertOne({
    guildId: data.guild.id,
    userId: data.user.id,
    code: codeData,
  });


};
