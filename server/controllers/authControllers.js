const express = require('express')
const jwt = require('jsonwebtoken');
const { getAllUsers } = require('../BLL/usersBLL');
const router = express.Router();

router.post('/login', async (req, res) => {
    const user = await getAllUsers()
    const username = req.body.username
    const password = req.body.password
    const validUser = user.find((user) => user.username === username && user.password === password)
    //valid name & password
    if (validUser) {
        //find user id os username
        const userID = "USERID"
        // get the secret key 
        const private_key = 'somekey'

        const tokenData = jwt.sign({ id: userID },
            private_key,
            { expiresIn: 7200 } // 2h
        )
        res.status(200).send({ token: tokenData })
    } else {
        res.sendStatus(401)
    }
})
module.exports = router;
