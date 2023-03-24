import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import KitchenCode from "../KitchenCode/KitchenCode";
import KitchenTime from "../KitchenTime/KitchenTime";
import QueueSlider from "../QueueSlider/QueueSlider";

import "src/css/Kitchen.css";

export default function Kitchen() {
  const [kitchenOpen, setKitchenOpen] = useState(true);
  const [kitchenClosed, setKitchenClosed] = useState(false);
  const [kitchen, setKitchen] = useState<Kitchen>();
  const [, setKitchenIsLoading] = useState(false);

  const stateOpen = () => {
    setKitchenOpen(true);
    setKitchenClosed(!setKitchenClosed);
  };
  const stateClosed = () => {
    setKitchenOpen(!setKitchenOpen);
    setKitchenClosed(true);
  };

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
        <h3>
          {kitchenOpen && <p>Restaurangen är öppen!</p>}
          {kitchenClosed && <p>Restaurangen är tyvärr stängd.</p>}
        </h3>
        <button className="kitchen-btn kitchen-open-btn" type="button" onClick={stateOpen}>
          Öppna
          <br />
          restaurangen
        </button>
        <button className="kitchen-btn kitchen-close-btn" type="button" onClick={stateClosed}>
          Stäng
          <br />
          restaurangen
        </button>
        <br />
      </div>
      <div>
        <KitchenCode kitchen={kitchen} />
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
