import axios from "axios";
import { ClientToServerDataInterface } from "../types";

function harperSaveMessage({
  message,
  username,
  room,
  __createdtime__,
}: ClientToServerDataInterface) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;

  if (!dbUrl || !dbPw) {
    return null;
  }

  const data = JSON.stringify({
    operation: "insert",
    schema: "story_time",
    table: "messages",
    records: [{ message, username, room, __createdtime__ }],
  });

  const config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: dbPw,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default harperSaveMessage;
