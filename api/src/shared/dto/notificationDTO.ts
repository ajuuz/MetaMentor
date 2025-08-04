import {INotificationEntity} from '../../entities/modelEntities/notificationModel.entity'

export type NotificationReqDTO = Omit<INotificationEntity,'isRead'|'createdAt'|'updatedAt'>