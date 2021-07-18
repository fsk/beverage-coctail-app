const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.post('/', apiController.search);
router.get('/', apiController.getAllBeverage);
router.get('/:coctailName', apiController.getBeverageByName);


module.exports = router;