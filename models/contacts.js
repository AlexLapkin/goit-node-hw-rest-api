const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data); 
}

const getContactById = async (id) => {
   const contacts = await listContacts();
   const contact = contacts.find(contact => contact.id === id);
   return contact || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return contacts[index];
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;    
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  contacts.forEach((contact) => {
    if (contact.id === id) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { id, ...body };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}