import { useState } from "react";
import { Helmet } from "react-helmet";
import Box from "@mui/material/Box";
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

  const buttonClass = kitchenStatus === KitchenStatus.Open ? "kitchen-btn kitchen-close-btn" : "kitchen-btn kitchen-open-btn";

  const buttonText = kitchenStatus === KitchenStatus.Open ? "Stäng restaurangen" : "Öppna restaurangen";

  return (
    <>
      <Helmet title="Kitchen" />
      <Box>
        <div className="kitchen-time">
          <div className="queue-status">
            <b>Restaurangen är {kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</b>
          </div>
          <br />
          <button className={buttonClass} type="button" onClick={toggleKitchenStatus}>
            {buttonText}
          </button>
        </div>
      </Box>
    </>
  );
}

export function KitchenState({ kitchen }: KitchenTimeProps) {
  return <p>Restaurangen är {kitchen?.kitchenStatus === KitchenStatus.Open ? "öppen!" : "tyvärr stängd."}</p>;
}
