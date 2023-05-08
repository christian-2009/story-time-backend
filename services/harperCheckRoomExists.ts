import axios from "axios";
import { Rooms } from "../types";

interface Props {
  room: string;
}

async function harperCheckRoomExists({ room }: Props) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  const data = JSON.stringify({
    operation: "sql",
    sql: `SELECT * FROM story_time.rooms WHERE room = '${room}'`,
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

  let roomInfo;
  try {
    const res = await axios(config);
    roomInfo = await res.data;
  } catch (e) {
    throw e;
  }

  if (roomInfo.length > 0) {
    return true;
  } else {
    return false;
  }

  // const checkingTable = new Promise((resolve, reject) => {
  //   axios(config)
  //     .then((response) => {
  //       resolve(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       reject(error);
  //     });
  // });

  // return checkingTable?.then((res) => {
  //   console.log(`[cs] res`, res);
  //   if (res.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
}

export default harperCheckRoomExists;
