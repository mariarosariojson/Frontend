import { createContext, useCallback, useState } from "react";

import type { User } from "Src/api/Dto";

import { UserType } from "Src/api/Enums";

interface UserContextType {
  userRole: User | null;
  adminOnly: boolean;
  setUserRole: (role: User) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
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

  const setUserRole = useCallback((user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setState(user);
  }, []);
  const adminOnly = userRole?.userType === UserType.Admin;

  return <UserContext.Provider value={{ userRole, adminOnly, setUserRole }}>{children}</UserContext.Provider>;
}

export { UserContext };
