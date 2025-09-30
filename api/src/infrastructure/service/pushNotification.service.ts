import { IFcmTokenRepository } from "domain/repositoryInterfaces/fcmTokenRepository.interface";
import { IPushNotificationService } from "application/interfaces/service/pushNotificationService.interface";
import { FirebaseAdminConfig } from "infrastructure/config/firebase/firebaseAdmin.config";
import { inject, injectable } from "tsyringe";
import { eventBus } from "shared/eventBus";
import { EVENT_EMITTER_TYPE } from "shared/constants";

@injectable()
export class PushNotificationService implements IPushNotificationService {
  constructor(
    @inject("IFcmTokenRepository")
    private _fcmTokenRepository: IFcmTokenRepository
  ) {
    this._registerEventListeners();
  }

  private _registerEventListeners(): void {
    eventBus.on(
      EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
      this.sendNotification.bind(this)
    );
  }

  async sendNotification(
    userId: string,
    title: string,
    body: string
  ): Promise<void> {
    const user = await this._fcmTokenRepository.findOne({ userId });
    if (!user?.fcmToken) {
      console.log(`No FCM token found for user ${userId}`);
      return;
    }

    const message = {
      notification: {
        title,
        body,
      },
      token: user.fcmToken,
    };

    const admin = FirebaseAdminConfig.getInstance();
    await admin.messaging().send(message);
    console.log(`Notification send to ${userId}`);
  }
}
