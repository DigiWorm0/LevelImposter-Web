export interface LIUser {
    uid: string;
    isAdmin?: boolean;
    isCreator?: boolean;
    displayName?: string;
    photoURL?: string;

    banned?: boolean;
    deleted?: boolean;
}