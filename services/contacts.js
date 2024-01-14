const { Contact } = require('../models/contact');

const getAll = async () => {
       const contacts = await Contact.find({}, "-createdAt -updatedAt");
       return contacts;
    }

const getContactById = async (id) => {
      const contact = await Contact.findById(id);
      return contact || null;
}
   
const removeContact = async (id) => {
      const contact = await Contact.findByIdAndDelete(id);
      return contact || null;
}

const addContact = async (body) => {
      const contact = await Contact.create(body);
      return contact;
}

const updateContact = async (id, body) => {
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    return contact || null;
}

const updateStatusContact = async (id, body) => {
   const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
   return contact || null;
}
   
module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}