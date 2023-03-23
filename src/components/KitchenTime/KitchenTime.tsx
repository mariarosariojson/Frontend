import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";
import type { KitchenStatus } from "Src/api/Enums";

export interface KitchenTimeProps {
  kitchen: Kitchen | undefined;
}

export default function KitchenTime({ kitchen }: KitchenTimeProps) {
  const [kitchens, setKitchens] = useState<KitchenStatus>();

  const changeState = (event: any, value: any) => {
    setKitchens(value);
    const kitchenTime = { ...kitchen, KitchenStatus: value };
    axios.put(`/api/Kitchen/${kitchenTime.kitchenId}`, kitchenTime);
    console.log(kitchenTime);
  };

  return (
    <Box>
      <div className="kitchen-queue">
        {/* <Slider marks aria-label="Öppettider" max={2} min={1} step={1} valueLabelDisplay="auto" onChange={changeState} /> */}
        <div>
          <h3>State {kitchen?.kitchenStatus}</h3>
        </div>
      </div>
      <div>
        <button className="add-edit-btn" type="button" onClick={() => changeState}>
          {" "}
          open / close <br /> restaurangen
        </button>
      </div>
    </Box>
  );
}

export function KitchenState({ kitchen }: KitchenTimeProps) {
  return <p>Restaurangen är {kitchen?.kitchenStatus ? "öppen" : ""}</p>;
}
