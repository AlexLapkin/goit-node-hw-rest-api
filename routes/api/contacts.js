const express = require('express');

const router = express.Router();

const controllers = require('../../controllers/contacts');

router.get('/', controllers.getAllContacts);

router.get('/:id', controllers.getContactById);

router.post('/', controllers.addContact);

router.delete('/:id', controllers.removeContact);

router.put('/:id', controllers.updateContact);

router.patch('/:id/favorite', controllers.updateStatusContact);
    
module.exports = router;