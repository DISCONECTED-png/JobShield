import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = {
  projectId: process.env.FB_PROJECT_ID,
  privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FB_CLIENT_EMAIL,
  clientId: process.env.FB_CLIENT_ID,
  authUri: process.env.FB_AUTH_URI,
  tokenUri: process.env.FB_TOKEN_URI,
  authProviderX509CertUrl: process.env.FB_AUTH_PROVIDER_CERT_URL,
  clientX509CertUrl: process.env.FB_CLIENT_CERT_URL,
  universeDomain: process.env.FB_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
