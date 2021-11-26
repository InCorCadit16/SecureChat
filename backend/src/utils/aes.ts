import * as crypto from 'crypto';
import { IUser } from '../models/User';

export default {
    createKeys: () => {
        const ECDH = crypto.createECDH('secp256k1');
        ECDH.generateKeys();
    
        return {
            publicECDHKey: ECDH.getPublicKey().toString('base64'),
            privateECDHKey: ECDH.getPrivateKey().toString('base64'),
        }
    },

    encryptMessage: (message: string, user: IUser, publicKey: string): string => {
        const authorKey = crypto.createECDH('secp256k1');
        authorKey.setPrivateKey(Buffer.from(user.privateECDHKey as string, 'base64'))
        const authorSharedKey = authorKey.computeSecret(publicKey, 'base64', 'hex');

        let IV = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(authorSharedKey, 'hex'), IV);

        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        let payload = IV.toString('hex') + encrypted + authTag;
        payload = Buffer.from(payload, 'hex').toString('base64')

        return payload
    },
}