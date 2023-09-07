import { errorMessage, listSuccessMessage } from "../../messages/messages.js";

export const listCodes = async (data) => {
  if (!data.member.permissions.has("Administrator"))
    return errorMessage(data, "You don't have permission!");

  const collection = data.codesCollection;

  let codes = await collection.find({}).toArray();
  if (codes.length === 0) {
    return errorMessage(data, "No Codes Found");
  }
  return listSuccessMessage(
    data,
    codes.map((c) => `${c.code} : ${c.duration}`)
  );
};
