import admin from 'firebase-admin';
import { config } from 'shared/config';

const serviceAccountKeyJson = config.FIREBASE.SERVICE_ACCOUNT_KEY_JSON

export class FirebaseAdminConfig{

    static initialize(){
        if(!admin.apps.length){
            const serviceAccount = JSON.parse(serviceAccountKeyJson);
            admin.initializeApp({
                credential:admin.credential.cert(serviceAccount)
            })
            console.log("firebase admin initialized")
        }
    }

    static getInstance(){
        FirebaseAdminConfig.initialize();
        return admin;
    }
}

