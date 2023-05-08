import axios from "axios";
import { Rooms } from "../types";
import harperCheckRoomExists from "./harperCheckRoomExists";
import harperGetRoom from "./harperGetRoom";
import harperSaveRoom from "./harperSaveRoom";

interface Props {
  room: string;
  password: string;
}

async function harperHandleTable({ room, password }: Props) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  const roomExists = await harperCheckRoomExists({ room: room });

  if (roomExists) {
    //check password is correct
    const roomDetails = (await harperGetRoom(room)) as Rooms;

    if (password === roomDetails.password) {
      return true;
    } else {
      throw new Error("password incorrect");
    }
  } else {
    await harperSaveRoom({ room, password });
    return true;
  }
}

export default harperHandleTable;
