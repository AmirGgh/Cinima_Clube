const express = require('express')
const jwt = require('jsonwebtoken');
const { getAllUsers } = require('../BLL/usersBLL');
const router = express.Router();

router.post('/login', async (req, res) => {
    const users = await getAllUsers()
    const username = req.body.username
    const password = req.body.password
    const validUser = users.find((user) => user.username === username && user.password === password)
    //valid name & password
    if (validUser) {
        //find user id or username
        const userID = validUser.id
        console.log(userID)
        // get the secret key 
        const private_key = 'somekey'

        const tokenData = jwt.sign({ id: userID },
            private_key,
            { expiresIn: 7400 } // 2h
        )
        res.status(200).send({ token: tokenData })
    } else {
        res.sendStatus(401)
    }
})
module.exports = router;
