import { IFcmTokenRepository } from "entities/repositoryInterfaces/fcmTokenRepository.interface";
import { IPushNotificationService } from "entities/serviceInterfaces/pushNotificationService.interface";
import { FirebaseAdminConfig } from "frameworks/firebase/firebaseAdmin";
import { inject, injectable } from "tsyringe";


@injectable()
export class PushNotificationService implements IPushNotificationService{

    constructor(
        @inject('IFcmTokenRepository')
        private _fcmTokenRepository:IFcmTokenRepository
    ){}

    async sendNotification(userId:string,title:string,body:string):Promise<void>{

        const user = await this._fcmTokenRepository.findOne({userId});
        if (!user?.fcmToken) {
          console.log(`No FCM token found for user ${userId}`);
          return;
        }

        const message = {
            notification:{
                title,
                body,
            },
            token:user.fcmToken
        }

        const admin = FirebaseAdminConfig.getInstance();
        await admin.messaging().send(message)
        console.log(`Notification send to ${userId}`)
    }
}