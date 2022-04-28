const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');
const ROLES_LIST=require('../config/roles')
const verifyRoles=require('../middleware/verifyRoles')

router.route('/')
    .get(membersController.getAllMembers)
    .post(verifyRoles(ROLES_LIST.Admin), membersController.createNewMembers)
   . put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),membersController.updateMember)
   .delete( verifyRoles(ROLES_LIST.Admin),membersController.deleteMember);
  

router.route('/:id')
    .get(membersController.getMember);

module.exports = router;