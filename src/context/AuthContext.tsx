// import React, { useContext, useEffect, useState } from "react";

// const AuthContext = React.createContext(null);

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider(props) {
//   const [authUser, setAuthUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const authenticate = async () => {
//       const user = await fetch("/api/User").then((res) => res.json());
//       if (user) {
//         setIsLoggedIn(true);
//         setAuthUser(user);
//       } else {
//         setIsLoggedIn(false);
//         setAuthUser(null);
//       }
//     };

//     return authenticate;
//   }, []);

//   const value = {
//     authUser,
//     setAuthUser,
//     isLoggedIn,
//     setIsLoggedIn
//   };

//   return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
// }
