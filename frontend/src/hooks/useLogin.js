import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useAuthenticate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateAuthUser } = useAuthContext();

    const authenticate = async (user, pass) => {
        if (!validateInput(user, pass)) return;
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass }),
            });

            const result = await response.json();
            if (result.error) {
                throw new Error(result.error);
            }

            localStorage.setItem("user-data", JSON.stringify(result));
            updateAuthUser(result);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, authenticate };
};
export default useAuthenticate;

const validateInput = (user, pass) => {
    if (!user || !pass) {
        toast.error("All fields are required");
        return false;
    }
    return true;
};