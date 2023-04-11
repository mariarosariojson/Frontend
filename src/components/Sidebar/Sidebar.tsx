import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Kitchen from "src/components/Kitchen/Kitchen";

import "src/css/Sidebar.css";

type Anchor = "right";

export default function SideBar() {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box className="sidebar" role="presentation" sx={{ width: "27rem", minHeight: "500%" }}>
      <List>
        <div className="sidebar-cart-header">
          <h2>
            <i className="bi bi-gear-wide-connected" />
             Inställningar
          </h2>
        </div>
      </List>
      <Stack>
        <Kitchen />
      </Stack>
    </Box>
  );

  return (
    <Button>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <i className="bi bi-list" />
          </IconButton>
        </React.Fragment>
      ))}
    </Button>
  );
}
