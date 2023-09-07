import { infoSuccessMessage } from "../../messages/messages.js";

export const licenseInfo = async (data) => {
    const collection = data.usersCollection;
    let licenseInfo = await collection.findOne({ userId: data.user.id });
    if (!licenseInfo)
      return await infoSuccessMessage(data, "No active licenses found!");
    licenseInfo = `**Username:** <@${data.user.id}>\n**Expiration Date:** <t:${Math.floor(
      licenseInfo.expiration / 1000
    )}:f>`; //licenseInfo.expiration/1000 converts utc to unix
    return await infoSuccessMessage(data, licenseInfo);
  };