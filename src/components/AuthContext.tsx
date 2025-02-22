import React, { createContext, useContext, useEffect, useState } from "react";
const endPoint = import.meta.env.VITE_BACKEND_ADDRESS;

export const INITIAL_USER = {
  _id: "",
  fullname: "",
  email: "",
  password: "",
  imageUrl: "",
  role: "",
  businessId: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsLoading: () => {},
  setIsAuthenticated: () => {},
};
interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  imageUrl: string;
  role: string;
  businessId: string;
}

interface IContextState {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IContextState>(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("rental_token");

  const getSessionUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${endPoint}/auth/user/get_session_user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.user) {
        setUser({
          _id: data.user._id,
          fullname: data.user.fullname,
          email: data.user.email,
          password: data.user.password,
          imageUrl: data.user.imageUrl,
          role: data.user.role,
          businessId: data.user.businessId,
        });
        setIsAuthenticated(true);
      } else {
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getSessionUser();
    }
  }, []);

  console.log("isAuthenticated", isAuthenticated);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);
