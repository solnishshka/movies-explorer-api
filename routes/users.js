const router = require('express').Router();

router.get("/me", (req, res) => {
  res.status(200).send({message: 'testGet'});
});

router.patch("/me", (req, res) => {
  res.status(200).send({message: 'testPatch'});
});

module.exports = router;