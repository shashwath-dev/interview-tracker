const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Interview = require('../models/Interview');

router.use(authMiddleware);

// GET all interviews
router.get('/', async (req, res) => {
  const interviews = await Interview.find();
  res.json(interviews);
});

// POST new interview
router.post('/', async (req, res) => {
  const { company, date, poc } = req.body;
  const newInterview = await Interview.create({ company, date, poc });
  res.json(newInterview);
});

// PATCH to mark as attended
router.patch('/:id/attend', async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  interview.attended = true;
  await interview.save();
  res.json(interview);
});

module.exports = router;
