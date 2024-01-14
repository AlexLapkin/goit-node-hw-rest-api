const express = require('express');

const controllers = require('../../controllers/contacts');

const router = express.Router();

router.get('/', controllers.getAllContacts);

router.get('/:id', controllers.getContactById);

router.post('/', controllers.addContact);

router.delete('/:id', controllers.removeContact);

router.put('/:id', controllers.updateContact);

router.patch('/:id', controllers.updateStatusContact);
    
module.exports = router;