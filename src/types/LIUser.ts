export default interface LIUser {
    uid: string;
    displayName?: string;
    photoURL?: string;

    isBanned?: boolean;
    isDeleted?: boolean;
    isAdmin?: boolean;
    isCreator?: boolean;
}