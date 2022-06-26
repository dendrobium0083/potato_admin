const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

/**
 * 管理者一覧を表示する
 */
router.get('/', function(req, res, next) {
/*
  knex.from("admin_user")
    .select("*, ROW_NUMBER() OVER (ORDER BY id DESC) as num ")
    .then(function (results) {
      res.render('admin/users', {
        adminUsers: results,
      });
    });
*/
    knex.raw("select admin_user.*, date_format(last_login_date,'%Y/%m/%d %H:%i:%S') as last_login_date_disp, ROW_NUMBER() OVER (ORDER BY id DESC) as num from admin_user ")
    .then(function (results) {
      res.render('admin/users', {
        adminUsers: results[0],
      });
    })
});

module.exports = router;
