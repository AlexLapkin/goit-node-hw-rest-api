const express = require('express');

const router = express.Router();

const authControllers = require('../../controllers/auth');

const auth = require("../../middlewares/auth");

router.post('/register', authControllers.register);

router.post('/login', authControllers.login);

router.post('/logout', auth, authControllers.logout);

router.get('/current', auth, authControllers.getCurrent);

// router.patch(
//    "/subscription",
//    authenticate,
//    validateBody(schemas.updateSubscriptionSchema),
//    ctrl.updateSubscription
//  );
    
module.exports = router;