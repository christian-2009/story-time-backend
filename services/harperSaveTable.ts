// import axios from "axios";

// /*

// check if room exists
// if room exists
//     do nothing
// else
//     add room and password to the table

// */

// interface Props {
//   room: string;
//   password: string;
// }

// function harperSaveTable({ room, password }: Props) {
//   const dbUrl = process.env.HARPERDB_URL;
//   const dbPw = process.env.HARPERDB_PW;
//   if (!dbUrl || !dbPw) return null;

//   const data = JSON.stringify({
//     operation: "sql",
//     sql: `SELECT * FROM story_time.rooms WHERE room = '${room}'`,
//   });

//   const config = {
//     method: "post",
//     url: dbUrl,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: dbPw,
//     },
//     data: data,
//   };

//   return new Promise((resolve, reject) => {
//     axios(config)
//       .then(function (response) {
//         resolve(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         reject(error);
//       });
//   });
// }

// export default harperGetMessages;
