// import { useAuth } from "../../context/AuthContext";

// export function Authentication() {
//   const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

//   const login = (e) => {
//     e.preventDefault();
//     setIsLoggedIn(true);
//     setAuthUser({ email: "test@mail.com", code: "1234" });
//   };
//   const logout = (e) => {
//     e.preventDefault();
//     setIsLoggedIn(false);
//     setAuthUser(null);
//   };

//   return (
//     <>
//       <span>Användaren är nu {isLoggedIn ? "Inloggad" : "Utloggad"}.</span>
//       {isLoggedIn ? <span> Användarnamn: {authUser.email}</span> : null}
//       <br />
//       {isLoggedIn ? (
//         <button
//           type="button"
//           onClick={(e) => {
//             logout(e);
//           }}
//         >
//           Logga ut
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={(e) => {
//             login(e);
//           }}
//         >
//           Logga ut
//         </button>
//       )}
//     </>
//   );
// }
