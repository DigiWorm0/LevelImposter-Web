import { useAuthState } from "react-firebase-hooks/auth";
import { HashRouter, Route, Routes } from "react-router-dom";
import { auth } from "../hooks/Firebase";
import { UserContext, _useUser } from "../hooks/useUser";
import Home from "./Home";
import Login from "./Login";
import Map from "./Map";
import Maps from "./Maps";
import NotFound from "./NotFound";
import Policy from "./Policy";
import Profile from "./Profile";
import User from "./User";

export default function Router() {
    const [user] = useAuthState(auth);
    const userData = _useUser(user?.uid);

    return (
        <UserContext.Provider value={userData}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/map/:id" element={<Map />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/policy" element={<Policy />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </UserContext.Provider>
    );
}