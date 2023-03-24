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
  // const [code, setCode] = useState<Kitchen>();

  const handleChange = (event: any) => {
    const { value } = event.target;
    setData(value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const kitchenCode = { ...kitchen, code: data };
    axios.put(`/api/Kitchen/${kitchenCode.kitchenId}`, kitchenCode).then((res) => {
      console.log(res.status, res.data.token);
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

// export function Code({ kitchen }: KitchenTimeProps) {
//   return <p>Dagens kod:</p>;
// }
