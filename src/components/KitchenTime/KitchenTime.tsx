import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import { KitchenStatus } from "Src/api/Enums";

import "src/css/Kitchen.css";

export interface KitchenTimeProps {
  kitchen: Kitchen | undefined;
}

export default function KitchenTime({ kitchen }: KitchenTimeProps) {
  const [kitchens, setKitchens] = useState<KitchenStatus>();

  const changeState = (event: any, value: any) => {
    setKitchens(value);
    const kitchenTime = { ...kitchen, KitchenStatus: value };
    axios.put(`/api/Kitchen/${kitchenTime.kitchenId}`, kitchenTime);
  };

  return (
    <Box>
      <div className="kitchen-time">
        <Slider marks max={2} min={1} onChange={changeState} />
        <div className="queue-status">
          <b>Restaurangen är {kitchen?.kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</b>
        </div>
      </div>
    </Box>
  );
}

export function KitchenState({ kitchen }: KitchenTimeProps) {
  return <p>Restaurangen är {kitchen?.kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</p>;
}
