import express from 'express'
const app = express()
const port = 3000
import multer from "multer";
import cors from 'cors'
import connection from './config/db.js'

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use('/uploads', express.static('uploads'))

//https://dekcom.doesystem.com/2023/09/03/NodeJs/1693706942508/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//Customer register
app.post('/signUp', async (req, res) => {
    const { id_card , firstname, lastname, phone, email, password, address } = req.body

    try {
        const [checkUser] = await connection.query(
            'SELECT * FROM Customer WHERE id_card = ?',
            [id_card]
        );
        if (checkUser.length === 0) {
            await connection.query(
                `INSERT INTO Customer (id_card, firstname, lastname, phone, email, password, address, level) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id_card , firstname, lastname, phone, email, password, address, 'Normal']
            );

            const [user] = await connection.query(
                "SELECT * FROM Customer WHERE id_card = ?",[id_card]
            )

            //{res:0, val:{id_card: xxx, password:yyy ,id:xxxyyy } }

            //https://inspector.dev/how-to-reverse-a-string-in-javascript-fast-tips/#:~:text=Method%201%3A%20Using%20the%20reverse,%22%3B%20let%20reversed%20%3D%20original.
            
            /*
            {
                "res": 0,
                "val": {
                    "id_card": "03111111111",
                    "password": "321iahcmos",
                    "id": "03111111111,321iahcmos"
                }  
            }
            */
    
            // {res:0, val:{id_card:reversedId , password:reversedpassword , id:output} }
        
            //https://www.geeksforgeeks.org/how-to-return-json-using-node-js/

            res.json({
                res: 0,
                val: {msg:"Register success"},
                user: user[0]
            });
        }
        else {
            res.json({
                res: 0,
                val: {msg:"You already have an account"}
            })
        }
           
    } catch (error) {
       // {res:-1, val:{} }
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Customer login
app.post('/signIn', async (req, res) => {
    const {id_card, password} = req.body
    var reversedId , reversedpassword, output;
    
    try {
        const [results] = await connection.query(
            'SELECT * FROM Customer WHERE id_card = ? and password = ?',
            [id_card , password]
        );

        if (results.length > 0) {
            const [insertLogin] = await connection.query(
                `INSERT INTO Login (id_card_customer, id_card_employee, account_type, login_time, logout_time)
                VALUES (?, ?, ?, ?, ?)` , [id_card, null, 'Customer', new Date(), null]
            )

            const [login] = await connection.query(
                "SELECT * FROM Login WHERE login_id = ?",[insertLogin.insertId]
            )
        
            reversedId = id_card.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            //reversedpassword = results[0]["password"].split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id },
                user: results[0],
                text: {msg:"Sign in success"}
            })
        }
        else {
            res.json({text: {msg:"Account not found"}})
        }  
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Customer not found"}
        })
        console.log(error);
    }
})


//Customer logout
app.get('/signOut', async (req, res) => {
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const id_card = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [id_card, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            await connection.query(
                "UPDATE Login SET logout_time = ? WHERE login_id = ?",
                [new Date(), val.login_id]
            )

            reversedId = id_card.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: results[0],
                login: login
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//delete customer
app.delete('/customer/:id_card' , async (req, res) => {
    const {id_card} = req.params
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [resultEmp] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (resultEmp.length > 0 && login.length > 0) {
            const [customers] = await connection.query('DELETE FROM Customer WHERE id_card = ?',[id_card])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {idCard:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: customers[0]
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//view customer
app.get('/customer/:id_card' , async (req, res) => {
    const {id_card} = req.params
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [resultEmp] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [resultCus] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (resultEmp.length > 0 || resultCus.length > 0 && login.length > 0) {
            const [customers] = await connection.query('SELECT * FROM Customer WHERE id_card = ?',[id_card])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {idCard:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: customers[0]
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})

//list customer
app.get('/customer' , async (req, res) => {
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [customers] = await connection.query('SELECT * FROM Customer')

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {idCard:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: customers
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Employee register
app.post('/signUpAdmin', async (req, res) => {
    const { id_card, employee_id, firstname, lastname, gender , phone, email, address, password, position, edit_time } = req.body
    
    try {
        const [checkUser] = await connection.query(
            'SELECT * FROM Customer WHERE id_card = ?',
            [id_card]
        );

        if(checkUser.length === 0) {
            await connection.query(
                `INSERT INTO Employee (id_card, employee_id, firstname, lastname, gender , phone, email, address, password, position, create_date, edit_time) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id_card, employee_id, firstname, lastname, gender, phone, email, address, password, position, new Date(), null]
            );

            const [user] = await connection.query(
                'SELECT * FROM Employee WHERE id_card = ?',
                [id_card])

            res.json({
                res: 0,
                val: {msg:"Register success"},
                user: user[0]
            });
        } else {
            res.json({val: {msg:"You already have an account"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Employee login
app.post('/signInAdmin', async (req, res) => {
    const {id_card, password, login_id} = req.body
    var reversedId , reversedpassword, output
    
    try {
        const [results] = await connection.query(
            'SELECT id_card , password , position FROM Employee WHERE id_card = ? and password = ?',
            [id_card, password]
        );

        if (results.length > 0) {
            const [insertLogin] = await connection.query(
                `INSERT INTO Login (login_id, id_card_customer, id_card_employee, account_type, login_time, logout_time)
                VALUES (?, ?, ?, ?, ?, ?)` , [login_id, null, id_card, 'Employee', new Date(), null]
            )

            const [login] = await connection.query(
                "SELECT * FROM Login WHERE login_id = ?",[insertLogin.insertId]
            )
        
            reversedId = id_card.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id , position:results[0].position},
                user: results[0],
                text: {msg:"Sign in success"}
            })
        }
        else {
            res.json({text: {msg:"Account not found"}})
        }  
 
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Employee logout
app.get('/signOutAdmin', async (req, res) => {
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            await connection.query(
                "UPDATE Login SET logout_time = ? WHERE login_id = ?",
                [new Date(), val.login_id]
            )

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {idCard:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: results[0],
                login: login
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Edit Employee
app.post('/employee/:id_card', async (req, res) => {
    const {id_card} = req.params
    const { phone, email, address, password, position } = req.body
    var reversedId , reversedpassword, output
    
    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const pass = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, pass]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            await connection.query(
                'UPDATE Employee SET phone = ?, email = ?, password = ?, address = ?, position = ?, edit_time = ? WHERE id_card = ?',
                [ phone, email, password, address, position, new Date(), id_card ]
            )

            const [employees] = await connection.query(
                'SELECT * FROM Employee WHERE id_card = ?',
                [id_card]
            )

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = employees[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: employees[0],
                text: {msg:"Update data success"}
            })

        } else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//delete employee
app.delete('/employee/:id_card' , async (req, res) => {
    const {id_card} = req.params
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [employees] = await connection.query('DELETE FROM Employee WHERE id_card = ?',[id_card])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: employees[0]
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//view employee
app.get('/employee/:id_card' , async (req, res) => {
    const {id_card} = req.params
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [employees] = await connection.query('SELECT * FROM Employee WHERE id_card = ?',[id_card])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: employees[0]
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})

//list employee
app.get('/employee' , async (req, res) => {
    var reversedId , reversedpassword, output

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [employees] = await connection.query('SELECT * FROM Employee')

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                user: employees
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})
//

//Create Room
app.post('/room', upload.single("image"), async (req, res) => {
    const { room_no, room_type, description, max_guest, bed, price, room_status, 
            health_club, swimming_pool, restaurant, bar, spa } = req.body;
    const image = req.file.filename;
    var reversedId , reversedpassword, output
    
    try {
        const val = req.query.val
        const id_card_emp = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password , position FROM Employee WHERE id_card = ? and password = ?',
            [id_card_emp, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            await connection.query(
                `INSERT INTO Room (room_no, room_type, description, max_guest, bed, image, price, room_status, health_club, swimming_pool, restaurant, bar, spa, add_time, id_card_emp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [room_no, room_type, description, max_guest, bed, image, price, room_status, health_club, swimming_pool, restaurant, bar, spa, new Date(), id_card_emp]
            );
            
            const [room] = await connection.query('SELECT * FROM Room WHERE room_no = ?',[room_no])

            reversedId = id_card_emp.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                room: room[0],
                text: {msg:"Create Room success"}
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//Edit Room
app.post('/room/:room_no', upload.single("image"), async (req, res) => {
    const {room_no} = req.params
    const { room_type, description, max_guest, bed, price, room_status, health_club, swimming_pool, restaurant, bar, spa } = req.body;
    var reversedId , reversedpassword, output;
    const image = req.file ? req.file.filename : null;
    
    try {
        const val = req.query.val
        const id_card_emp = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password , position FROM Employee WHERE id_card = ? and password = ?',
            [id_card_emp, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {

            const [imageRoom] = await connection.query('SELECT image FROM Room WHERE room_no = ?', [room_no]);

            await connection.query(
                `UPDATE Room SET room_type = ?, description = ?, max_guest = ?, bed = ?, image = ?, price = ?, room_status = ?, health_club = ?, swimming_pool = ?, restaurant = ?, bar = ?, spa = ? WHERE room_no = ?`, 
                [ room_type, description, max_guest, bed, image || imageRoom[0].image , price, room_status, health_club, swimming_pool, restaurant, bar, spa, room_no]
            );

            await connection.query(
                `INSERT INTO Edit_Room (id_card_emp, room_no, edit_time ) VALUES (?, ?, ?)`, 
                [id_card_emp, room_no, new Date()]
            )

            const [room] = await connection.query('SELECT * FROM Room WHERE room_no = ?',[room_no])

            reversedId = id_card_emp.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id , position:results[0].position},
                room: room[0],
                text: {msg:"Update Room success"}
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//delete room
app.delete('/room/:room_no' , async (req, res) => {
    const {room_no} = req.params
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [rooms] = await connection.query('DELETE FROM Room WHERE room_no = ?',[room_no])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                room: rooms[0]
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//view room
app.get('/room/:room_no' , async (req, res) => {
    const {room_no} = req.params
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');

        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [rooms] = await connection.query('SELECT * FROM Room WHERE room_no = ?',[room_no])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                room: rooms[0]
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//list rooms
app.get('/rooms' , async (req, res) => {
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [resultEmp] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [resultCus] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        )

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (resultEmp.length > 0 || resultCus.length > 0 && login.length > 0) {
            const [rooms] = await connection.query('SELECT * FROM Room')

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                room: rooms
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Create Booking
app.post('/booking', async (req, res) => {
    const { checkIn_date, checkOut_date, total_room, total_price, room_no, id_card} = req.body;
    var reversedId , reversedpassword, output;
    
    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [insertBooking] = await connection.query(
                `INSERT INTO Booking (book_time, checkIn_date, checkOut_date, total_room, total_price, booking_status, id_card)
                VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [ new Date(), checkIn_date, checkOut_date, total_room, total_price, 'Paid', id_card]
            )

            const [booking] = await connection.query(
                "SELECT * FROM Booking WHERE booking_id = ?",[insertBooking.insertId]
            )
            for (const room of room_no) {
                await connection.query(`INSERT INTO Booking_room (booking_id, room_no) VALUES (?,?)`,[insertBooking.insertId, room])
            }

            const [updateLevel] = await connection.query(
                `SELECT c.*, 
                    (
                        SELECT 
                            IFNULL(	SUM(DISTINCT b.total_price) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM booking b
                        LEFT JOIN checkin ci ON ci.booking_id = b.booking_id
                        WHERE b.id_card = c.id_card AND b.booking_status = 'Paid'
                    ) +
                    (
                        SELECT 
                            IFNULL(	SUM(IFNULL(ci.room_charge,0)) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM checkin ci
                        WHERE ci.id_card = c.id_card AND ci.booking_id IS NULL
                    ) AS amount
                FROM customer c
                WHERE c.id_card = ?`,[id_card]
            )

            if (updateLevel[0].amount < 10000) {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Normal", id_card])
            }

            else if (updateLevel[0].amount > 10000 && updateLevel[0].amount < 20000) {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Gold", id_card])
            }

            else {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Premium", id_card])
            }

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                book: {booking:booking[0] , room_no:room_no}
            });
        } 
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Customer not found"}
        })
        console.log(error);
    }
})


//Cancle Booking
app.post('/booking/:booking_id', async (req, res) => {
    const { booking_id } = req.params;
    var reversedId , reversedpassword, output;
    
    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            await connection.query(`UPDATE Booking SET booking_status = ? WHERE booking_id = ?`, [ "Cancle", booking_id])

            const [booking] = await connection.query('SELECT * FROM Booking WHERE booking_id = ?',[booking_id])

            const [updateLevel] = await connection.query(
                `SELECT c.*, 
                    (
                        SELECT 
                            IFNULL(	SUM(DISTINCT b.total_price) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM booking b
                        LEFT JOIN checkin ci ON ci.booking_id = b.booking_id
                        WHERE b.id_card = c.id_card AND b.booking_status = 'Paid'
                    ) +
                    (
                        SELECT 
                            IFNULL(	SUM(IFNULL(ci.room_charge,0)) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM checkin ci
                        WHERE ci.id_card = c.id_card AND ci.booking_id IS NULL
                    ) AS amount
                FROM customer c
                WHERE c.id_card = ?`,[idCard]
            )

            if (updateLevel[0].amount < 10000) {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Normal", idCard])
            }

            else if (updateLevel[0].amount > 10000 && updateLevel[0].amount < 20000) {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Gold", idCard])
            }

            else {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Premium", idCard])
            }
            
            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                booking: booking[0]
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Customer not found"}
        })
        console.log(error);
    }
})


//view booking
app.get('/booking/:booking_id' , async (req, res) => {
    const { booking_id } = req.params
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [resultsCus] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [resultsEmp] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (resultsCus.length > 0 || resultsEmp.length > 0 && login.length > 0) {
            const [bookings] = await connection.query(
                `SELECT * FROM booking 
                JOIN customer on booking.id_card = customer.id_card
                WHERE booking.booking_id = ?`
                ,[booking_id])
            
            const [room] = await connection.query(
                `SELECT *
                FROM booking_room as b
                JOIN room as r on b.room_no = r.room_no
                WHERE b.booking_id = ?`
                ,[booking_id])

            const [checkIn] = await connection.query(
                `SELECT b.booking_id , b.room_no , r.room_type , r.room_status , r.price ,
                        c.id_card , c.firstname , c.lastname, c.phone , c.email ,c.address
                FROM booking_room as b
                JOIN checkin as c on c.room_no = b.room_no and b.booking_id = c.booking_id
                JOIN room as r on r.room_no = c.room_no
                WHERE c.booking_id = ?`
                ,[booking_id])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                book: bookings[0] , room , checkIn
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})

//view your booking
app.get('/bookings/:id_card' , async (req, res) => {
    const { id_card } = req.params
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [bookings] = await connection.query(
                `SELECT * FROM Booking WHERE id_card = ?`,[id_card])

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                book: bookings
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//list booking
app.get('/bookings' , async (req, res) => {
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [bookings] = await connection.query(
                `SELECT b.*, c.firstname , c.lastname,
                    (SELECT COUNT(ci.room_no) 
                        FROM CheckIn ci 
                        JOIN Booking_room br 
                        ON ci.room_no = br.room_no AND ci.booking_id = br.booking_id 
                        WHERE br.booking_id = b.booking_id) AS checked_in_rooms
                FROM Booking b
                JOIN Customer c ON c.id_card = b.id_card`)

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                booking: bookings
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//CheckIn booking
app.post('/checkIn', async (req, res) => {
    const { id_card, booking_id, firstname, lastname, phone, email, address, room_no, checkIn_time, end_date, room_charge } = req.body;
    var reversedId , reversedpassword, output;
    
    try {
        const val = req.query.val
        const id_card_checkIn = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [id_card_checkIn, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            
            const [insertCheckIn] = await connection.query(
                `INSERT INTO CheckIn (booking_id, id_card, firstname, lastname, phone, email, address, room_no, checkIn_time, checkOut_time, end_date, room_charge, damage_fee, late_checkOut_fee, payment_status, id_card_checkIn, id_card_checkOut)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [booking_id, id_card, firstname, lastname, phone, email, address, room_no, new Date(checkIn_time), null, new Date(end_date), room_charge, null, null, 'Paid', id_card_checkIn, null]
            );

            await connection.query(`UPDATE Room SET room_status = ? WHERE room_no = ?`, ['Check-in',room_no])

            const [checkIn] = await connection.query(`SELECT * FROM CheckIn WHERE checkIn_id = ?`, [insertCheckIn.insertId])

            
            reversedId = id_card_checkIn.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                checkIn: checkIn[0]
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//get CheckIn booking
app.get('/checkIn/:checkIn_id', async (req, res) => {
    const { checkIn_id } = req.params;
    var reversedId , reversedpassword, output;
    
    try {
        const val = req.query.val
        const id_card_checkIn = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [id_card_checkIn, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {

            const [checkIn] = await connection.query(`
                SELECT c.checkIn_id , c.booking_id , c.id_card , c.firstname , c.lastname , c.phone , c.email , c.address , 
                    c.room_no , c.checkIn_time , c.checkOut_time , c.end_date , c.damage_fee , c.late_checkOut_fee , c.payment_status , 
                    c.id_card_checkIn , c.id_card_checkOut , r.room_type , c.room_charge , r.price , r.room_status
                FROM checkin as c
                JOIN Room as r on r.room_no = c.room_no
                WHERE checkIn_id = ?`
                , [checkIn_id])
            
            reversedId = id_card_checkIn.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                checkIn: checkIn[0]
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//CheckIn walk_in
app.post('/checkInWalkIn', async (req, res) => {
    const { id_card, firstname, lastname, phone, email, address, room_no, checkIn_time, end_date, room_charge } = req.body;
    var reversedId , reversedpassword, output;
    
    try {
        const val = req.query.val
        const id_card_checkIn = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [id_card_checkIn, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [insertCheckIn] = await connection.query(
                `INSERT INTO CheckIn (booking_id, id_card, firstname, lastname, phone, email, address, room_no, checkIn_time, checkOut_time, end_date, room_charge, damage_fee, late_checkOut_fee, payment_status, id_card_checkIn, id_card_checkOut)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [null, id_card, firstname, lastname, phone, email, address, room_no, new Date(checkIn_time), null, new Date(end_date), room_charge, null, null, 'Pending', id_card_checkIn, null]
            );

            await connection.query(`UPDATE Room SET room_status = ? WHERE room_no = ?`, ['Check-in',room_no])

            const [checkIn] = await connection.query(`SELECT * FROM CheckIn WHERE checkIn_id = ?`, [insertCheckIn.insertId])
            
            reversedId = id_card_checkIn.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                checkIn: checkIn[0]
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//CheckOut
app.post('/checkOut/:checkIn_id', async (req, res) => {
    const { checkIn_id } = req.params;
    const { damage_fee, late_checkOut_fee, checkOut_time } = req.body;
    var reversedId , reversedpassword, output;
    
    try {
        const val = req.query.val
        const id_card_checkOut = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [id_card_checkOut, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [room] = await connection.query('SELECT room_no FROM CheckIn WHERE checkIn_id = ?', [checkIn_id]);

            await connection.query(
            'UPDATE CheckIn SET damage_fee = ? , late_checkOut_fee = ? , payment_status = ? , checkOut_time = ? , id_card_checkOut = ? WHERE checkIn_id = ? ', 
                [ damage_fee, late_checkOut_fee, 'Complete', new Date(checkOut_time) , id_card_checkOut , checkIn_id ]
            );

            await connection.query(`UPDATE Room SET room_status = ? WHERE room_no = ?`, ['Avaliable',room[0].room_no])

            const [checkIn] = await connection.query(
                'SELECT * FROM CheckIn WHERE checkIn_id = ?',
                [checkIn_id]
            );

            const [updateLevel] = await connection.query(
                `SELECT c.*, 
                    (
                        SELECT 
                            IFNULL(	SUM(DISTINCT b.total_price) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM booking b
                        LEFT JOIN checkin ci ON ci.booking_id = b.booking_id
                        WHERE b.id_card = c.id_card AND b.booking_status = 'Paid'
                    ) +
                    (
                        SELECT 
                            IFNULL(	SUM(IFNULL(ci.room_charge,0)) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM checkin ci
                        WHERE ci.id_card = c.id_card AND ci.booking_id IS NULL
                    ) AS amount
                FROM customer c
                WHERE c.id_card = ?`,[checkIn[0].id_card]
            )

            if (updateLevel[0].amount < 10000) {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Normal", checkIn[0].id_card])
            }

            else if (updateLevel[0].amount > 10000 && updateLevel[0].amount < 20000) {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Gold", checkIn[0].id_card])
            }

            else {
                await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Premium", checkIn[0].id_card])
            }

            reversedId = id_card_checkOut.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;
    
            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                checkIn: checkIn[0]
            });
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }
        
    } catch (error) {
        res.json({
            res:-1,
            val: {msg:"Employee not found"}
        })
        console.log(error);
    }
})


//list CheckOut
app.get('/checkOut' , async (req, res) => {
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [checkIn] = await connection.query('SELECT * FROM CheckIn')

            const [checkUser] = await connection.query(
                'SELECT id_card FROM Customer WHERE id_card = ?',
                [checkIn[0].id_card]
            );

            if (checkUser.length > 0) {
                const [updateLevel] = await connection.query(
                    `SELECT c.id_card , SUM(ifnull(b.total_price,0) + ifnull(ci.damage_fee,0) + ifnull(ci.late_checkOut_fee,0)) AS amount
                    FROM customer c
                    JOIN booking b ON c.id_card = b.id_card
                    JOIN checkin ci ON ci.id_card = c.id_card
                    WHERE c.id_card = ? AND b.booking_status = 'Paid';`,[checkIn[0].id_card]
                )

                if (updateLevel[0].amount < 10000) {
                    await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Normal", checkIn[0].id_card])
                }

                else if (updateLevel[0].amount > 10000 && updateLevel[0].amount < 20000) {
                    await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Gold", checkIn[0].id_card])
                }

                else {
                    await connection.query(`UPDATE Customer SET level = ? WHERE id_card = ?`, [ "Premium", checkIn[0].id_card])
                }
            }

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                checkIn: checkIn
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//Check Room Avaliable
app.post('/checkRoom' , async (req, res) => {
    const {checkIn_date , checkOut_date} = req.body
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [resultsCus] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [resultsEmp] = await connection.query(
            'SELECT id_card , password FROM Employee WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ?",[val.login_id]
        )

        if (resultsCus.length > 0 || resultsEmp.length > 0 && login.length > 0) {
            const [checkRoom] = await connection.query(
                `SELECT r.*
                FROM Room r
                WHERE r.room_no NOT IN (
                    SELECT c.room_no FROM CheckIn c
                    WHERE (c.checkIn_time BETWEEN ? AND ?)
                    OR (c.end_date BETWEEN ? AND ?)
                    )  
                    AND r.room_no NOT IN (
                        SELECT br.room_no FROM booking b JOIN booking_room br ON b.booking_id = br.booking_id
                        WHERE (b.checkIn_date BETWEEN ? AND ?)
                        OR (b.checkOut_date BETWEEN ? AND ?)
                        AND b.booking_status = 'Paid'
                    )` , 
                    [checkIn_date , checkOut_date , checkIn_date , checkOut_date ,
                    checkIn_date , checkOut_date , checkIn_date , checkOut_date ,]
            )

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                checkRoom: checkRoom
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//check bank card no.
app.get('/payment' , async (req, res) => {
    var reversedId , reversedpassword, output;

    try {
        const val = req.query.val
        const idCard = val.id_card.toString().split('').reverse().join('');
        const password = val.password.toString().split('').reverse().join('');
 
        const [results] = await connection.query(
            'SELECT id_card , password FROM Customer WHERE id_card = ? and password = ?',
            [idCard, password]
        );

        const [login] = await connection.query(
            "SELECT * FROM Login WHERE login_id = ? and logout_time IS NULL",[val.login_id]
        )

        if (results.length > 0 && login.length > 0) {
            const [payment] = await connection.query(`SELECT * FROM Payment`)

            reversedId = idCard.split('').reverse().join('');
            reversedpassword = results[0].password.split('').reverse().join('');
            output = reversedId + reversedpassword;

            res.json({
                res: 0,
                val: {id_card:reversedId , password:reversedpassword , id:output , login_id:login[0].login_id},
                payment: payment
            })
        }
        else {
            res.json({val: {msg:"Account not found"}})
        }

    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


//get level
app.get('/level' , async (req, res) => {
    const level = req.query.level
    try {
        if(level == null) {
            const [levelCus] = await connection.query(
                `SELECT c.*, 
                    (
                        SELECT 
                            IFNULL(	SUM(DISTINCT b.total_price) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM booking b
                        LEFT JOIN checkin ci ON ci.booking_id = b.booking_id
                        WHERE b.id_card = c.id_card AND b.booking_status = 'Paid'
                    ) +
                    (
                        SELECT 
                            IFNULL(	SUM(IFNULL(ci.room_charge,0)) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM checkin ci
                        WHERE ci.id_card = c.id_card AND ci.booking_id IS NULL
                    ) AS amount
                FROM customer c`)
            res.json({
                res: 0,
                level: levelCus
            })
        } else {
            const [levelUser] = await connection.query(
                `SELECT c.*, 
                    (
                        SELECT 
                            IFNULL(	SUM(DISTINCT b.total_price) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM booking b
                        LEFT JOIN checkin ci ON ci.booking_id = b.booking_id
                        WHERE b.id_card = c.id_card AND b.booking_status = 'Paid'
                    ) +
                    (
                        SELECT 
                            IFNULL(	SUM(IFNULL(ci.room_charge,0)) + 
                                    SUM(IFNULL(ci.damage_fee, 0)) + 
                                    SUM(IFNULL(ci.late_checkOut_fee, 0)),0)
                        FROM checkin ci
                        WHERE ci.id_card = c.id_card AND ci.booking_id IS NULL
                    ) AS amount
                FROM customer c
                WHERE c.level = ?` , [level])

            res.json({
                res: 1,
                level: levelUser
            })
        }
           
    } catch (error) {
        res.json({
            res:-1,
            val: {}
        })
        console.log(error);
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})