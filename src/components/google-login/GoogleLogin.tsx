import GoogleLogin from "react-google-login";

const clientId = "758380863651-69t6pe0h7ta7g7btvh7v9dt5r1b3nkkd.apps.googleusercontent.com";

const onSuccess = (res: any) => {
  console.log("Login Success: currentUser:", res.profileObj);
};

const onFailure = (res: any) => {
  console.log("Login failed: res:", res);
};

export default function GoogleLoginButton() {
  return (
    <div id="signInButton">
      <GoogleLogin
        isSignedIn
        buttonText="Logga in med Google"
        clientId={clientId}
        cookiePolicy="single_host_origin"
        onFailure={onFailure}
        onSuccess={onSuccess}
      />
    </div>
  );
}
