import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Helmet defaultTitle={process.env.WP_TITLE} titleTemplate={`%s | ${process.env.WP_TITLE}`} />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
