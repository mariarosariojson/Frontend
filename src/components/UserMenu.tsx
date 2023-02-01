import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import "src/css/Navbar.css";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            aria-controls={open ? "account-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            size="small"
            sx={{ ml: 2 }}
            onClick={handleClick}
          >
            <i className="bi bi-list icon-mobile" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              zIndex: 0
            }
          }
        }}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        id="account-menu"
        open={open}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        onClick={handleClose}
        onClose={handleClose}
      >
        <MenuItem>
          <i className="bi bi-basket icon-mobile" /> Kundvagn
        </MenuItem>
        <MenuItem>
          <i className="bi bi-person-circle icon-mobile" /> Min Profil
        </MenuItem>
        <Divider />
        <MenuItem>
          <i className="bi bi-gear icon-mobile" />
          Settings
        </MenuItem>
        <MenuItem>
          <i className="bi bi-box-arrow-right icon-mobile" />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
