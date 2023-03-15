import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

export default function KitchenTime() {
  const [text, setText] = useState("");

  function handleChange(e: any) {
    setText(e.target.value);
  }

  async function fetchCode() {
    const { data } = await axios.get(`/api/Kitchen/`);

    return data;
  }

  return (
    <Box>
      <div>
        <InputCode label="1" value={text} onChange={handleChange} />
        <InputCode label="2" value={text} onChange={handleChange} />
      </div>
    </Box>
  );
}

function InputCode({ label, value, onChange }: any) {
  return (
    <div className="kitchen-code">
      <h3>Dagens kod</h3>
      <label>
        {label} <input className="kitchen-input" type="text" value={value} onChange={onChange} />
      </label>
      {/* <button className="kitchen-input-btn" type="button">
      Ändra kod
    </button> */}
    </div>
  );
}
