import Tag from '../models/tagModel.js';

const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Tag name is required and must be a non-empty string' });
    }

    // Check for existing tag
    const existingTag = await Tag.findOne({ name: name.trim() });
    if (existingTag) {
      return res.status(400).json({ message: `Tag with name '${name}' already exists` });
    }

    // Create and save the tag
    const tag = new Tag({ name: name.trim() });
    await tag.save();

    res.status(201).json({ message: 'Tag created successfully', tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTag };
