const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'TU_CLOUD_NAME',
    api_key: 'TU_API_KEY',
    api_secret: 'TU_API_SECRET'
});

module.exports = (pool) => {
    return {
        uploadImage: async (req, res) => {
            try {
                const result = await cloudinary.uploader.upload(req.body.image);
                const query = 'INSERT INTO images (url, approved, user_id) VALUES ($1, $2, $3) RETURNING *';
                const values = [result.secure_url, false, req.user.uid];
                const { rows } = await pool.query(query, values);
                res.json(rows[0]);
            } catch (error) {
                res.status(500).json({ message: 'Error al subir imagen' });
            }
        },
        getImagesFromUnsplash: async (req, res) => {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/random?query=aurora-borealis&count=12&client_id=TU_UNSPLASH_ACCESS_KEY`);
                const images = await response.json();
                const savedImages = await Promise.all(images.map(async image => {
                    const query = 'INSERT INTO images (url, approved) VALUES ($1, $2) RETURNING *';
                    const values = [image.urls.regular, true];
                    const { rows } = await pool.query(query, values);
                    return rows[0];
                }));
                res.json(savedImages);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener imágenes' });
            }
        },
        getApprovedImages: async (req, res) => {
            try {
                const query = 'SELECT * FROM images WHERE approved = true';
                const { rows } = await pool.query(query);
                res.json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener imágenes' });
            }
        }
    };
};
