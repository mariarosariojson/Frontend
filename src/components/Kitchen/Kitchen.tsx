import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import KitchenTime from "../KitchenTime/KitchenTime";
import QueueSlider from "../QueueSlider/QueueSlider";

import "src/css/Kitchen.css";

export interface KitchenProps {
  closed: string;
  open: string;
}

export default function Kitchen() {
  const [kitchenOpen, setKitchenOpen] = useState("tyvärr stängd");
  const [kitchen, setKitchen] = useState<Kitchen>();
  const [, setKitchenIsLoading] = useState(false);

  useEffect(() => {
    setKitchenIsLoading(true);
    const path = `/api/Kitchen/`;
    axios.get(path).then((response) => {
      setKitchen(response.data);
      setKitchenIsLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet title="Kitchen" />
      <div className="kitchen-status" id="kitchen-status">
        <h3>Restaurangen är {kitchenOpen}</h3>
        <button className="kitchen-btn kitchen-open-btn" type="button" onClick={() => setKitchenOpen("öppen!")}>
          Öppna
          <br />
          restaurangen
        </button>
        <button className="kitchen-btn kitchen-close-btn" type="button" onClick={() => setKitchenOpen("tyvärr stängd.")}>
          Stäng
          <br />
          restaurangen
        </button>
        <br />
        <div className="kitchen-code">
          <h3>Dagens kod</h3>
          <div>{kitchen?.code}</div>
          <br />
          <input className="kitchen-input" type="text" />
          <button className="kitchen-input-btn" type="button">
            Ändra kod
          </button>
        </div>
      </div>
      <div>
        <KitchenTime kitchen={kitchen} />
      </div>
      <div>
        <QueueSlider kitchen={kitchen} />
      </div>
    </>
  );
}

// export function KitchenTime() {
//   return <h3>Restaurangen är {}</h3>;
// }
