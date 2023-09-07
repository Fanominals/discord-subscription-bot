import {
  manageUserAddMessage,
  manageUserRemoveMessage,
  errorMessage,
  infoSuccessMessage,
} from "../../messages/messages.js";
import config from "../../config.json" assert { type: "json" };

export const manageUser = async (data) => {
  if (!data.member.permissions.has("Administrator"))
    return errorMessage(data, "You don't have permission!");

  let managedUserId;
  console.log(data.args[2]);
  try {
    managedUserId = data.args[2].match(/[0-9]+/g)[0];
  } catch {
    errorMessage(data, "Invalid User!");
  }
  const collection = data.usersCollection;

  try {
    if (data.args[3].toLowerCase() === "add") {
      manageUserAdd(data, managedUserId, collection);
    } else if (data.args[3].toLowerCase() === "remove") {
      manageUserRemove(data, managedUserId, collection);
    } else if (data.args[3].toLowerCase() === "info") {
      manageUserInfo(data, managedUserId, collection);
    } else {
      errorMessage(data, "Use add / remove to manage a user!");
    }
  } catch (error) {
    console.log(error);
    errorMessage(data, "Invalid Command!");
  }
};

const manageUserAdd = async (data, managedUserId, collection) => {
  let multiplier;
  let time;
  let duration = 0;
  try {
    multiplier = parseInt(data.args[4].match(/\d+/g)[0]);

    time = data.args[4].match(/\D+/g)[0].toLowerCase();
    switch (time) {
      case "s":
        duration = multiplier * 1000; //seconds
        break;
      case "m":
        duration = multiplier * 1000 * 60; //minutes
        break;
      case "h":
        duration = multiplier * 1000 * 60 * 60; //hours
        break;
      case "d":
        duration = multiplier * 1000 * 60 * 60 * 24; //days
        break;
      case "w":
        duration = multiplier * 1000 * 60 * 60 * 24 * 7; //weeks
        break;
      case "mo":
        duration = multiplier * 1000 * 60 * 60 * 24 * 30; //months
        break;
      case "y":
        duration = multiplier * 1000 * 60 * 60 * 24 * 365; //years
        break;
    }
    if (duration === 0) return errorMessage(data, "Invalid Time");
  } catch (e) {
    return errorMessage(data, "Invalid Time");
  }

  if (managedUserId === config.role) {
    console.log("all donators");
    await collection.updateMany({}, { $inc: { expiration: duration } });
    console.log("updated");
    return manageUserAddMessage(data, `<@&${config.role}>`, duration);
  }
  const licenseInfo = await collection
    .find({ userId: managedUserId })
    .toArray();

  if (licenseInfo.length > 0) {
    await collection.findOneAndUpdate(
      { userId: managedUserId },
      { $inc: { expiration: duration } },
      { returnNewDocument: true }
    );
    // console.log(await newLicenseInfo);
  } else {
    //insert new entry if one already doesnt exist
    await collection.insertOne({
      guildId: data.guild.id,
      userId: managedUserId,
      code: "N/A",
      added: Date.now(),
      expiration: Date.now() + duration,
    });

    await data.guild.members.addRole({
      user: managedUserId,
      role: config.role,
    });
  }
  return manageUserAddMessage(data, `<@${managedUserId}>`, duration);
};

const manageUserRemove = async (data, managedUserId, collection) => {
  console.log("remove");
  let licenseInfo = await collection.find({ userId: managedUserId }).toArray();

  console.log(licenseInfo);

  if (licenseInfo.length < 1) return errorMessage(data, "User Has No Roles!");
  collection.deleteOne({ userId: managedUserId });
  data.guild.members.removeRole({ user: managedUserId, role: config.role });
  return manageUserRemoveMessage(data, managedUserId);
};

const manageUserInfo = async (data, managedUserId, collection) => {
  console.log(managedUserId);
  let licenseInfo = await collection.findOne({ userId: `${managedUserId}`});
  console.log(licenseInfo)
  if (!licenseInfo)
    return infoSuccessMessage(data, "No active licenses found!");
  licenseInfo = `Username: <@${managedUserId}>\nExpiration Date: <t:${Math.floor(
    licenseInfo.expiration / 1000
  )}:f>`; //licenseInfo.expiration/1000 converts utc to unix
  return infoSuccessMessage(data, licenseInfo);
};
