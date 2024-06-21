import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

export  const useAuthContext = () => {
    return useContext(AuthContext)
};