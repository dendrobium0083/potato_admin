const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/user', {
    adminUser: null,
  });
});

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  knex.from("admin_user")
    .where({user_id: req.params.userId})
    .select("*")
    .then(function (results) {
      res.render('admin/user', {
        adminUser: results[0],
      });
    });
});

router.post('/', function(req, res, next) {
  const spParam = [
    0
    , req.body.user_id
    , req.body.name
    , req.body.name_kana
    , req.body.email
    , req.body.gender
    , req.body.status
    , req.body.auth_type
    , 0
  ];


  // 管理者登録
  knex.raw('call mainte_admin_user(?,?,?,?,?,?,?,?,?);', spParam)
    .then(function (result) {
      res.redirect('/admin/user/' + req.body.user_id);
    })
    .catch(function (err) {
      console.log(err);
    });
});


module.exports = router;
