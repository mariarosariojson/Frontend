// import { createContext, useContext, useState } from "react";

// import type { ReactNode } from "react";

// import Login from "Src/pages/Login";

// export interface LoginProviderProps {
//   children: ReactNode;
// }

// export interface UserType {
//   admin: boolean;
//   user: boolean;
// }

// export interface LoginContext {
//   isLoggedIn: boolean;
//   userType?: UserType;
//   setIsLoggedIn: (isLoggedIn: boolean) => void;
//   setUserType: (userType: UserType) => void;
// }

// const LoginContext = createContext({} as LoginContext);

// export function useLoginContext() {
//   return useContext(LoginContext);
// }

// export function LoginProvider({ children }: LoginProviderProps) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState<UserType>();

//   return (
//     <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType }}>
//       {children}
//       <Login />
//     </LoginContext.Provider>
//   );
// }
