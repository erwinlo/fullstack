/*
Fill in code to do GET, POST, PUT, DELETE for transactions table here.
*/

const connection = require('./database');

const express = require('express');

router = express.Router();

router.get('/:userId', (req, res) => {
    connection.query(
        `SELECT transactions.*, acc.account_type, acc.account_number, acc.balance 
               FROM transactions LEFT JOIN accounts AS acc 
               ON transactions.account_id = acc.account_id 
               WHERE (acc.user_id = ${req.params.userId})
               ORDER BY transactions.date DESC`,
        (errors, results) => {
            if (errors) {
                res.status(400).send('Error occured while sending request.');
            } else {
                if (res.length == 0) {
                    res.status(404).send('Id not found.');
                }
                res.send(results);
            }
        }
    );

});

router.post('/:userId', (req, res) => {
    res.status(403).send('POST operation not supported.');
});

router.put('/:userId', (req, res) => {
    res.status(403).send('PUT operation not supported.');
});

router.delete('/:userId', (req, res) => {
    res.status(403).send('DELETE operation not supported.');
});

/*     routers for /     */
router.get('/', (req, res) => {
    res.status(400).send('Error! Id is blank.');
});

router.post('/', (req, res) => {
    res.status(403).send('POST operation not supported.');
});

router.put('/', (req, res) => {
    res.status(403).send('PUT operation not supported.');
});

router.delete('/', (req, res) => {
    res.status(403).send('DELETE operation not supported.');
});

module.exports = router;