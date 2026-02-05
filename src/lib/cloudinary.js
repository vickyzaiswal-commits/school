// Cloudinary removed — keep a harmless stub to avoid import errors.
module.exports = {
    uploader: {
        upload: async () => {
            throw new Error('Cloudinary has been removed. Use /api/upload instead.');
        },
    },
};
