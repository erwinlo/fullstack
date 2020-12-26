/*
routes file for getting bank accounts for user_id

user_id is sent through web URI
*/

const connection = require('./database');

const express = require('express');

router = express.Router();

router.get('/:userId', (req, res) => {
    connection.query(
        `SELECT acc.account_id,insti.short_name, acc.account_type, acc.account_number, acc.balance 
               FROM accounts AS acc 
               LEFT JOIN institutions AS insti 
               ON acc.institution_id = insti.institution_id 
               WHERE (acc.user_id = ${req.params.userId}) 
               AND (acc.account_type IN ('savings','current','fixed_deposit'))`,
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