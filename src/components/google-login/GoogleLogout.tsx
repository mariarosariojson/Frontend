import { GoogleLogout } from "react-google-login";

const clientId = "758380863651-69t6pe0h7ta7g7btvh7v9dt5r1b3nkkd.apps.googleusercontent.com";

export default function GoogleLogoutButton() {
  const onSuccess = () => {
    console.log("Logout successfull");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout buttonText="Logga ut" clientId={clientId} onLogoutSuccess={onSuccess} />
    </div>
  );
}
