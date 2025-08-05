import crypto from 'crypto';
import multer from 'multer';

import { extname, resolve, dirname } from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) =>{
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        }
    }
}