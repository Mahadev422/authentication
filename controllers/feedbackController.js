import Feedback from '../models/Feedback.js';

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ error: 'Rating and message are required.' });
    }
    const newFeedback = new Feedback({ rating, feedback });
    await newFeedback.save();

    res.status(201).json('Thank you for your feedback! We appreciate your input.');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all feedbacks (optional)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
