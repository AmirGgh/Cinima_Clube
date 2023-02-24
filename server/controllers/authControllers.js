const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/login', function (req, res) {
    const username = req.body.username
    const password = req.body.password
    //valid name & password
    if (true) {
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
