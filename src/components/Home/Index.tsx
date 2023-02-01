import { Helmet } from "react-helmet";

import PlaceholderImg from "Src/images/placeholder.png";

export default function Index() {
  return (
    <>
      <Helmet title="Home" />
      <div style={{ width: "933px", marginLeft: "auto", marginRight: "auto" }}>
        <h1>Home</h1>
        <img src={PlaceholderImg} style={{ width: "700px", margin: "10px 0" }} />
      </div>
    </>
  );
}
