const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");

const isValidId = require("../../middlewares/validateId");

const auth = require("../../middlewares/auth");

router.get("/", auth, controllers.getAllContacts);

router.get("/:id", auth, isValidId, controllers.getContactById);

router.post("/", auth, controllers.addContact);

router.delete("/:id", auth, isValidId, controllers.removeContact);

router.put("/:id", auth, isValidId, controllers.updateContact);

router.patch("/:id/favorite", auth, isValidId, controllers.updateStatusContact);

module.exports = router;
