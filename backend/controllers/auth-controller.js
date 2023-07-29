const connection = require("../config");
const { comparePassword, hashPassword } = require('./../helper/authHelper');


//Register a customer
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        console.log("register called", name, email, password, phone, address);
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Passord is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone- is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }

        //check user
        let existingUser = null;
        let sql = 'SELECT * FROM customers WHERE email = ?';
        connection.query(sql, [email], async (error, results) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: "some error occurd during registration"
                })
            } else {
        
                existingUser = results;

                if (existingUser.length > 0) {
                    return res.status(200).send({
                        success: false,
                        message: 'Already Register please login'
                    })
                }
                //register user
                const hashedPassword = await hashPassword(password);
                //save
                const customer = {
                    name,
                    email,
                    phone,
                    address,
                    password: hashedPassword,
                }
                sql = 'INSERT INTO customers (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)';
                const values = [customer.name, customer.email, customer.phone, customer.address, customer.password];

                connection.query(sql, values, (error, results) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            message: 'Error while registering customer',
                            error
                        });
                    } else {
                        res.status(201).send({
                            success: true,
                            message: 'User registered successfully',
                            customer
                        });
                    }
                });
            }
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};


//customer login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        let user = null;
        let sql = 'SELECT * FROM customers WHERE email = ?';
        connection.query(sql, [email], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send({
                    success: false,
                    message: "User Not found",
                    error,
                });
            } else {
                user = results[0];
                //console.log("user", user[0].name);
                if (!user) {
                    return res.status(400).send({
                        success: false,
                        message: "Email is not registerd",
                    });
                }

                const match = await comparePassword(password, user.password);
                if (!match) {
                    return res.status(500).send({
                        success: false,
                        message: "Invalid Password",
                    });
                }

                res.status(200).send({
                    success: true,
                    message: "login successfully",
                    user: {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        adddress: user.address,
                    }
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};


exports.registerController = registerController;
exports.loginController = loginController;