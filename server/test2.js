import mysql from 'mysql2/promise';
const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hotel_db",
    // timzone: 'Z',
    // dateStrings : true,
  });


try {
    const [user] = await connection.query(
        "SELECT * FROM User"
    )

    console.log(user)
    // res.json({
    //     res: 0,
    //     val: {msg:"Register success"},
    //     user: user[0]
    // });
       
} catch (error) {
    res.json({
        res:-1,
        val: {}
    })
    console.log(error);
}

console.log(new Date().toLocaleString());
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);



// try {
//     const idCard = '0123456789101'
//     const password ='zara123'
//     const login_id = '226'

//     const [results] = await connection.query(
//         'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
//         [idCard, password]
//     );

//     const [login] = await connection.query(
//         "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[login_id]
//     )

//     if (results.length > 0 && login.length > 0) {
//         const [checkIn] = await connection.query('SELECT * FROM CheckIn')

//         const reversedId = idCard.split('').reverse().join('');
//         const reversedpassword = results[0].password.split('').reverse().join('');
//         const output = reversedId + reversedpassword;

//         console.log(checkIn)
        
//         // res.json({
//         //     res: 0,
//         //     val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
//         //     checkIn: checkIn
//         // })
//     }
//     else {
//         console.log('Account not found')
//         // res.json({val: {msg:"Account not found"}})
//     }

// } catch (error) {
//     // res.json({
//     //     res:-1,
//     //     val: {}
//     // })
//     console.log(error);
// }



// try {

    
//         const login_id = 226

//         const [login] = await connection.query(
//             "SELECT * FROM Login WHERE login_id = ?",[login_id]
//         )
    
        

//         console.log(login)
//         // res.json({
//         //     res: 0,
//         //     val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id },
//         //     user: results[0],
//         //     text: {msg:"Sign in success"}
//         // })
//     }
      
    
//  catch (error) {
//     // res.json({
//     //     res:-1,
//     //     val: {msg:"Customer not found"}
//     // })
//     console.log(error);
// }
