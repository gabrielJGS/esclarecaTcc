const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { storageOption, s3Config_bucketPost, s3Config_accessKeyId, s3Config_secretAccessKey } = require('../.env')


const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err);
                }
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        },
    }),
    s3: multerS3({
        s3: new aws.S3({
            accessKeyId: s3Config_accessKeyId,
            secretAccessKey: s3Config_secretAccessKey,
        }),
        bucket: s3Config_bucketPost,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err);
                }
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    }),
}

module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: storageTypes[storageOption],
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
    FileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
        ];

        if (allowedMimes.includes(file.mimeType)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type.'));
        }
    }
};