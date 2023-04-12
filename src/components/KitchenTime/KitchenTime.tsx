import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import { KitchenStatus } from "Src/api/Enums";

import "src/css/Kitchen.css";

export interface KitchenTimeProps {
  kitchen: Kitchen | undefined;
}

export default function KitchenTime({ kitchen }: KitchenTimeProps) {
  const [kitchenStatus, setKitchenStatus] = useState<KitchenStatus>(kitchen?.kitchenStatus || KitchenStatus.Closed);

  const toggleKitchenStatus = () => {
    const newKitchenStatus = kitchenStatus === KitchenStatus.Open ? KitchenStatus.Closed : KitchenStatus.Open;
    setKitchenStatus(newKitchenStatus);
    const kitchenTime = { ...kitchen, kitchenStatus: newKitchenStatus };
    axios.put(`/api/Kitchen/${kitchenTime.kitchenId}`, kitchenTime);
  };

  return (
    <Box>
      <div className="kitchen-time">
        <div className="queue-status">
          <b>Restaurangen är {kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</b>
        </div>
        <br />
        <button className="kitchen-btn kitchen-open-btn" type="button" onClick={toggleKitchenStatus}>
          Öppna
          <br />
          restaurangen
        </button>
        <button className="kitchen-btn kitchen-close-btn" type="button" onClick={toggleKitchenStatus}>
          Stäng
          <br />
          restaurangen
        </button>
      </div>
    </Box>
  );
}

export function KitchenState({ kitchen }: KitchenTimeProps) {
  return <p>Restaurangen är {kitchen?.kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</p>;
}
