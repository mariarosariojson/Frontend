import { Helmet } from "react-helmet";

export default function Error401() {
  return (
    <>
      <Helmet title="Unauthorized" />
      <h1>Unauthorized</h1>
    </>
  );
}
