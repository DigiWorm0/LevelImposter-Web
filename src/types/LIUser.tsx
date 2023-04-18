export interface LIUser {
    uid: string;
    isAdmin?: boolean;
    isCreator?: boolean;
    displayName?: string;
    photoURL?: string;

    isBanned?: boolean;
    isDeleted?: boolean;
}