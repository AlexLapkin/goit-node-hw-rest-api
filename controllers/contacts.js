const contactService = require('../services/contacts');

const { schemasJoi } = require('../models/contact');

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactService.getAll();
        res.json(contacts);
    } catch (err) {
        next(err);
    }
};


const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactService.getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(contact);
    } catch (err) {
        next(err);
    }
}; 


const removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactService.removeContact(id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json({ message: "Contact deleted" });
      } catch (err) {
        next(err);
     }
};


const addContact = async (req, res, next) => {
    try {
        const { error } = schemasJoi.add.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const contact = await contactService.addContact(req.body);
        res.status(201).json(contact);
    } catch (err) {
        next(err);
    }
};


const updateContact = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "missing fields" });
        }
        const { error } = schemasJoi.add.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const { id } = req.params;
        const contact = await contactService.getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        const updatedContact = await contactService.updateContact(id, req.body);
        if (updatedContact) {
         res.json(updatedContact);
        }
    } catch (err) {
        next(err);
    }
};


const updateStatusContact = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "missing field favorite" });
        }
        const { error } = schemasJoi.favoriteSchema.validate(req.body);
        console.log(error)
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const { id } = req.params;
        const contact = await contactService.getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        const updatedContact = await contactService.updateStatusContact(id, req.body);
        if (updatedContact) {
         res.json(updatedContact);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
};