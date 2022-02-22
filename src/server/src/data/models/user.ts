// import {Model} from '../../typings/data';
// import {db} from '../index';
//
// export const User: Model = {
//   create: ({email, password, phoneNumber, firstName, lastName, birthDate, gender}: any) => {
//     const query = {
//       text: `
//         INSERT INTO users(
//           email,
//           password,
//           phone_number,
//           first_name,
//           last_name,
//           birth_date,
//           gender
//         )
//         VALUES ($1, $2, $3, $4, $5, $6, $7)
//       `,
//       values: [email, password, phoneNumber, firstName, lastName, birthDate, gender],
//     };
//
//     return db.query(query);
//   },
// };
