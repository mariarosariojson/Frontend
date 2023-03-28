import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";

export default function UserTypeButton() {
  const [userType, setUserType] = React.useState("customer");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={userType}
        onChange={handleChange}
      >
        <Stack direction="row" mt={1}>
          <FormControlLabel control={<Radio />} label="Kund" value="customer" />
          <FormControlLabel disabled control={<Radio />} label="Admin" value="admin" />
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}
