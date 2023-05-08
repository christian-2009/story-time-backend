import axios from "axios";

function harperGetRoom(room: string) {
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

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(response.data[0]);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default harperGetRoom;
