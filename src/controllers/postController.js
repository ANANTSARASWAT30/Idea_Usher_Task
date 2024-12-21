import Post from '../models/postModel.js';
import Tag from '../models/tagModel.js';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { validationResult } from 'express-validator';

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getPosts = async (req, res) => {
  try {
    const { sort, page = 1, limit = 10, keyword, tag } = req.query;
    const query = {};

    // Handle keyword search
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } },
      ];
    }

    // Handle tag filter
    if (tag) {
      const tagDoc = await Tag.findOne({ name: tag });
      if (tagDoc) {
        query.tags = tagDoc._id;
      } else {
        return res.status(400).json({ message: `Tag '${tag}' does not exist` });
      }
    }

    // Handle pagination
    const skip = (page - 1) * limit;
    const limitInt = parseInt(limit);

    // Handle sorting
    const sortOptions = sort ? { createdAt: sort } : { createdAt: 'desc' };

    // Query posts with population of tags
    const posts = await Post.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitInt)
      .populate('tags', 'name'); // Populate 'tags' field with the tag name

    // Get total count for pagination info
    const totalPosts = await Post.countDocuments(query);

    // Send response
    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limitInt),
      currentPage: page,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, desc, tags } = req.body;

    // Check for file upload
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Handle Cloudinary upload
    let imageUrl;
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Image upload failed: ' + error.message });
    }

    // Ensure tags are in an array format
    const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

    // Fetch or create tag IDs
    const tagIds = await Promise.all(
      tagsArray.map(async (tag) => {
        let tagDoc = await Tag.findOne({ name: tag.trim() });
        if (!tagDoc) {
          // Create the tag if it doesn't exist
          tagDoc = new Tag({ name: tag.trim() });
          await tagDoc.save();
        }
        return tagDoc._id; // Save tag as ObjectId
      })
    );

    // Create the post
    const post = new Post({
      title,
      desc,
      image: imageUrl,
      tags: tagIds,
    });

    await post.save();

    // Fetch the post again, populating the tags with names
    const populatedPost = await Post.findById(post._id).populate('tags', 'name');
    
    res.status(201).json(populatedPost); // Return the populated post with tag names
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPosts, createPost, upload };
