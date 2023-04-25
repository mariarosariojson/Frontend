import { createContext, useCallback, useState } from "react";

import type { User } from "Src/api/Dto";

import { UserType } from "Src/api/Enums";

interface UserContextType {
  userRole: User | null;
  adminOnly: boolean;
  setUserRole: (role: User | null) => void;
  logout: () => void;
  isLoggedIn: User | null;
  userId: number | null;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<User | null>(null);
  const [userRole, setState] = useState<User | null>(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as User;
    } catch {
      return null;
    }
  });

  const setUserRole = useCallback((user: User | null) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setState(user);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("user");
    setState(null);
  }, []);

  const adminOnly = userRole?.userType === UserType.Admin;
  const userId = userRole?.userId ?? null;

  return <UserContext.Provider value={{ userRole, adminOnly, setUserRole, logout, isLoggedIn, userId }}>{children}</UserContext.Provider>;
}

export { UserContext };
