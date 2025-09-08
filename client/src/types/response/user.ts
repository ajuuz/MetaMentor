export type UserDetailsRes= {
    name: string;
    profileImage: string | File | null;
    mobileNumber?: string | null | undefined;
    country?: string | null | undefined;
    email?: any;
    gender?: string | null | undefined;
}