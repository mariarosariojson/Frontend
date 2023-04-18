import { createContext, useState } from "react";

interface UserContextType {
  userRole: string;
  adminOnly: boolean;
  setUserRole: (role: string) => void;
}

const UserContext = createContext<UserContextType>({
  userRole: "",
  adminOnly: false,
  setUserRole: () => {}
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string>("");

  const adminOnly = userRole === "admin";

  return <UserContext.Provider value={{ userRole, adminOnly, setUserRole }}>{children}</UserContext.Provider>;
}

export { UserContext };
