const express = require('express')
const jwt = require('jsonwebtoken');
const { getAllUsers } = require('../BLL/usersBLL');
const { getUserByUID } = require('../Sessions&Premitions/users_sessions/userActs');
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
        // get the secret key 
        const exp = await getUserByUID(userID) //SessionTimeOut
        console.log(exp)
        const private_key = 'somekey'

        const tokenData = jwt.sign({ id: userID },
            private_key,
            { expiresIn: exp } // 2h
        )
        res.status(200).send({ token: tokenData })
    } else {
        res.sendStatus(401)
    }
})
module.exports = router;
