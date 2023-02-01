import { Helmet } from "react-helmet";

export default function Error404() {
  return (
    <>
      <Helmet title="Page not found" />
      <h1>Page not found...</h1>
    </>
  );
}
