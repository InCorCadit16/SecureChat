const crypto = require('crypto');

export default {
    decrypt: (message, partnerPK) => {
        let token = localStorage.getItem('token').split('.')[1];
        const stringToken = Buffer.from(token, 'base64');
        token = JSON.parse(stringToken);
        const privateKey = token.data._doc.privateECDHKey;
        
        const ecdh = crypto.createECDH('secp256k1');
        ecdh.setPrivateKey(privateKey, 'base64');

        const sharedKey = ecdh.computeSecret(partnerPK, 'base64', 'hex');
        
        const payloadHex = Buffer.from(message.text, 'base64').toString('hex');
        const receivedIV = payloadHex.substr(0, 32);
        const receivedEncrypted = payloadHex.substr(32, payloadHex.length - 64);
        const receivedAuthTag = payloadHex.substr(payloadHex.length - 32, 32);
    
        const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(sharedKey, 'hex'), Buffer.from(receivedIV, 'hex'));
        decipher.setAuthTag(Buffer.from(receivedAuthTag, 'hex'));
    
        let decrypted = decipher.update(receivedEncrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        message.text = decrypted;
        return message;
    },

    encrypt: (message, partnerPK) => {
        let token = localStorage.getItem('token').split('.')[1];
        const stringToken = Buffer.from(token, 'base64');
        token = JSON.parse(stringToken);
        const privateKey = token.data._doc.privateECDHKey;
        
        const ecdh = crypto.createECDH('secp256k1');
        ecdh.setPrivateKey(privateKey, 'base64');

        const sharedKey = ecdh.computeSecret(partnerPK, 'base64', 'hex');

        let IV = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(sharedKey, 'hex'), IV);

        let encrypted = cipher.update(message.text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        let payload = IV.toString('hex') + encrypted + authTag;
        payload = Buffer.from(payload, 'hex').toString('base64')

        message.text = payload;
        return message;
    }
} 