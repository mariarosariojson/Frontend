import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import "src/css/OrderComplete.css";

export default function OrderComplete() {
  return (
    <>
      <Helmet title="Tack!" />
      <Box className="thankyou-container">
        <div>Tack för din beställning!</div>
        <div className="thankyou-btn-container">
          <Link to="/Home">
            <button className="thankyou-btn" type="button">
              Tillbaka till restaurangen
            </button>
          </Link>
        </div>
      </Box>
    </>
  );
}
