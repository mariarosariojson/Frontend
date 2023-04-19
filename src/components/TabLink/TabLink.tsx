import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import "src/css/Navbar.css";

export default function LinkTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <br />
      <br />
      <Tabs centered className="nav-tabs" value={value} onChange={handleChange}>
        <div className="tab-nav">
          <Link to="/Created">
            <Tab icon={<i className="bi bi-plus-circle-fill" />} label="Inkomna" />
          </Link>
          <Link to="/Confirmed">
            <Tab icon={<i className="bi bi-hand-thumbs-up-fill" />} label="Bekräftade" />
          </Link>
          <Link to="/Done">
            <Tab icon={<i className="bi bi-check-circle-fill" />} label="Slutförda" />
          </Link>
          <Link to="/Chef">
            <Tab icon={<i className="bi bi-person-lines-fill" />} label="Alla Ordrar" />
          </Link>
          <Link to="/Closed">
            <Tab icon={<i className="bi bi-x-circle-fill" />} label="Stängda" />
          </Link>
        </div>
      </Tabs>
    </Box>
  );
}
