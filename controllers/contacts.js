const contactSchema = require("../middlewares/validateBody");

const contactsOperations = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsOperations.listContacts();
        res.json(contacts);
    } catch (err) {
        next(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactsOperations.getContactById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(contact);
    } catch (err) {
        next(err);
    }
}; 

const addContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const newContact = await contactsOperations.addContact(req.body);
        res.status(201).json(newContact);
    } catch (err) {
        next(err);
    }
};

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactsOperations.removeContact(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json({ message: "Contact deleted" });
    } catch (err) {
        next(err);
    }
};
 
const updateContact = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "missing fields" });
        }
        const { error } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const { contactId } = req.params;
        const contact = await contactsOperations.getContactById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        const updatedContact = await contactsOperations.updateContact(contactId, req.body);
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
};