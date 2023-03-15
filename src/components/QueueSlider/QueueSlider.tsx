import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import type { KitchenStatus } from "Src/api/Enums";

export interface QueueSliderProps {
  kitchenQueue: number;
}

export default function QueueSlider() {
  const [kitchenQueue, setKitchenQueue] = useState<KitchenStatus>(5);

  const changeValue = (event: any, value: any) => {
    setKitchenQueue(value);
  };
  console.log(kitchenQueue);

  return (
    <Box sx={{ width: 280 }}>
      <div className="kitchen-queue">
        <h3>Sätt kötid</h3>
        <Slider marks aria-label="Minuter" defaultValue={5} max={60} min={5} step={5} valueLabelDisplay="auto" onChange={changeValue} />
        <div className="queue-status">
          <h3 id="queue-time">Kötid: {kitchenQueue}minuter</h3>
        </div>
      </div>
    </Box>
  );
}
