const db = require('../config/db.config');

class Content {
    static async create(title, type, description, status, thumbnailId) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO content (title, type, description, status, thumbnail_id) VALUES (?, ?, ?, ?, ?)',
                [title, type, description, status, thumbnailId],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result.insertId);
                }
            );
        });
    }

    static async addFile(contentId, fileName, filePath, fileType, fileSize) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO files (content_id, file_name, file_path, file_type, file_size) VALUES (?, ?, ?, ?, ?)',
                [contentId, fileName, filePath, fileType, fileSize],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result.insertId);
                }
            );
        });
    }

    static async findByType(type) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT c.*, f.file_path as thumbnail_path FROM content c LEFT JOIN files f ON c.thumbnail_id = f.id WHERE c.type = ? ORDER BY c.created_at DESC',
                [type],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT c.*, f.file_path as thumbnail_path FROM content c LEFT JOIN files f ON c.thumbnail_id = f.id WHERE c.id = ?',
                [id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                }
            );
        });
    }
}

module.exports = Content;
