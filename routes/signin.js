/**
 * 認証処理
 */
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// GET:認証処理
router.get('/', function (req, res, next) {
  res.redirect('/home');
});

router.post('/',  function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;

  knex.transaction(trx => {
    return knex.raw(
      'call login_admin(?, ?, @p_id, @p_result);',
      [userId, password]
    )
    .then(res => knex.select(knex.raw('@p_id, @p_result')));
  })
  .then(results => {
    console.log(results);
    if (results[0]['@p_result'] == '0') {
      // 認証OK
      req.session.id = results[0]['@p_id'];
      req.session.userId = userId;
      res.redirect('/home');
    } else {
      // 認証NG
      res.redirect('/');
    }
  });
});

module.exports = router;
