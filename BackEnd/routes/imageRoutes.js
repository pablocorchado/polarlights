const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

module.exports = (pool) => {
    const { uploadImage, getImagesFromUnsplash, getApprovedImages } = imageController(pool);

    router.post('/upload', uploadImage);
    router.get('/unsplash', getImagesFromUnsplash);
    router.get('/', getApprovedImages);

    return router;
};
