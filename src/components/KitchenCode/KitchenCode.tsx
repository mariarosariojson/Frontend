/* eslint-disable react/button-has-type */
import { useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import "src/css/Kitchen.css";

export interface KitchenTimeProps {
  kitchen: Kitchen | undefined;
}

export default function KitchenCode({ kitchen }: KitchenTimeProps) {
  const [data, setData] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const kitchenCode = { ...kitchen, code: data };
    axios.put(`/api/Kitchen/${kitchenCode.kitchenId}`, kitchenCode).then((res) => {
      return res;
    });
  };

  return (
    <Box>
      <div className="kitchen-code">
        <div className="todays-code">
          <h3>Dagens kod</h3>
          <p>{kitchen?.code}</p>
        </div>
        <form className="kitchen-form" onSubmit={handleSubmit}>
          <br />
          <input required className="kitchen-input" placeholder="Ny kod" type="text" onChange={handleChange} />
          <button className="kitchen-input-btn" type="submit">
            Ändra kod
          </button>
        </form>
        <br />
      </div>
    </Box>
  );
}
