export type ROLES='user'|'admin'|'mentor'

export type GENDER = 'male'|'female'|'other'

export type PAYMENT_METHOD = 'upi'|'wallet'

export type PAYMENT_STATUS = 'success'|'failed'

export type REVIEW_STATUS = 'pass'|'fail'|'pending'|'cancelled'

export type REVIEW_FILTER_STATUS = 'pass'|'fail'|'pending'|'cancelled'|'completed'

export type DATE_RANGE= 'today' | 'week' | 'month' | 'all'

export type PENDING_REVIEW_STATE='over'|'notOver'

export const MENTOR_APPLICATION_STATUS:{ACCEPTED:'accepted',REJECTED:'rejected'}={
    ACCEPTED:"accepted",
    REJECTED:'rejected'
}

