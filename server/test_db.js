import connection from './config/db.js'

/*try {
    const [results, fields] = await connection.query(
      'SELECT * FROM Customer WHERE `id_card` = "1234567890123" '
    );
  
    console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }


const id_card = '1234567890123'
try {
    const [results] = await connection.query(
        'SELECT id_card , password FROM Customer WHERE id_card = ?',
        [id_card]
      );

      if (results.length > 0) {
        const reversedId = id_card.split('').reverse().join('');
        const reversedpassword = results[0].password.split('').reverse().join('');
        const output = reversedId + reversedpassword;
        console.log(output);
    } else {
        console.log('Customer not found.');
    }

    console.log(results);
    
} catch (error) {
    console.log(error);
}
*/


  try {
      const results = await connection.query(
          `INSERT INTO Customer (id_card, firstname, lastname, phone, email, password, address) 
          VALUES ('1234567890987', 'Somchai', 'Jaidee', '0985641237', 'somchai@exemple.com', '24 Ramkamhang', '0123')`
      );
  
      console.log('register success')
      
  } catch (error) {
      console.log(error);
  }