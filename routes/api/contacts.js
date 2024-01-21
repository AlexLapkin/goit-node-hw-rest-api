const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");

const auth = require("../../middlewares/auth");

router.get("/", auth, controllers.getAllContacts);

router.get("/:id", auth, controllers.getContactById);

router.post("/", auth, controllers.addContact);

router.delete("/:id", auth, controllers.removeContact);

router.put("/:id", auth, controllers.updateContact);

router.patch("/:id/favorite", auth, controllers.updateStatusContact);

module.exports = router;
