import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import LIUser from "../../types/LIUser";
import LIRoles from "../../types/LIRoles";

export default async function getUser(uid: string) {

    // Get User Data
    const usersRef = collection(db, 'users');
    const docRef = doc(usersRef, uid);
    const userDataRef = await getDoc(docRef);
    if (!userDataRef.exists())
        return;

    const userData = userDataRef.data() as LIUser;

    // Get Roles
    const rolesRef = collection(docRef, 'roles');
    const rolesDataRef = await getDocs(rolesRef);
    const roles = rolesDataRef.docs.map(doc => doc.id as LIRoles) ?? [];

    // Update Old Role System
    userData.isAdmin = roles.includes(LIRoles.Admin);
    userData.isCreator = roles.includes(LIRoles.Creator);
    userData.isBanned = roles.includes(LIRoles.Banned);
    userData.isDeleted = roles.includes(LIRoles.Deleted);


    return userData;
}