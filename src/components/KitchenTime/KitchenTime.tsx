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
        <Button color={kitchenStatus === KitchenStatus.Open ? "success" : "error"} variant="contained" onClick={toggleKitchenStatus}>
          {kitchenStatus === KitchenStatus.Open ? "Stäng restaurangen" : "Öppna restaurangen"}
        </Button>
        <div className="queue-status">
          <b>Restaurangen är {kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</b>
        </div>
      </div>
    </Box>
  );
}

export function KitchenState({ kitchen }: KitchenTimeProps) {
  return <p>Restaurangen är {kitchen?.kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</p>;
}
