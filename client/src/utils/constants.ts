export type ROLES='user'|'admin'|'mentor'

export type GENDER = 'male'|'female'|'other'

export type PAYMENT_METHOD = 'upi'|'wallet'

export type PAYMENT_STATUS = 'success'|'failed'

export type REVIEW_STATUS = 'pass'|'fail'|'pending'|'cancelled'

export const MENTOR_APPLICATION_STATUS:{ACCEPTED:'accepted',REJECTED:'rejected'}={
    ACCEPTED:"accepted",
    REJECTED:'rejected'
}

