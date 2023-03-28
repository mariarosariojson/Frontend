import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";
import type { KitchenStatus } from "Src/api/Enums";

export interface QueueSliderProps {
  kitchen: Kitchen | undefined;
}

export default function QueueSlider({ kitchen }: QueueSliderProps) {
  const [kitchenQueue, setKitchenQueue] = useState<KitchenStatus>();

  const changeValue = (event: any, value: any) => {
    setKitchenQueue(value);
    const sliderValue = { ...kitchen, kitchenQueueTime: value };
    axios.put(`/api/Kitchen/${sliderValue.kitchenId}`, sliderValue);
  };

  return (
    <Box>
      <div className="kitchen-queue">
        <Slider marks aria-label="Minuter" max={60} min={5} step={5} value={kitchenQueue} valueLabelDisplay="auto" onChange={changeValue} />
        <div className="queue-status">
          <b>Kötid: {kitchen?.kitchenQueueTime}minuter</b>
        </div>
      </div>
    </Box>
  );
}

export function KitchenLine({ kitchen }: QueueSliderProps) {
  return (
    <p id="queue-time">
      Kötiden är cirka <b>{kitchen?.kitchenQueueTime}</b> minuter
    </p>
  );
}
