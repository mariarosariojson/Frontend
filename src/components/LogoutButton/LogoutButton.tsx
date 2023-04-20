import { useContext } from "react";
import { UserContext } from "src/context/UserContextProvider";

import "src/css/LogoutButton.css";

export default function LogoutButton() {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  return (
    <button className="logout-btn" type="button" onClick={handleLogout}>
      <i className="bi bi-power" />
    </button>
  );
}
