import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { CreateKitchen } from "Src/api/Dto";

import "src/css/Kitchen.css";

export default function Kitchen() {
  const [kitchenOpen, setKitchenOpen] = useState("tyvärr stängd");
  const [kitchen, setKitchen] = useState<CreateKitchen[]>([]);
  const [kitchenIsLoading, setKitchenIsLoading] = useState(false);

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
      </div>
    </>
  );
}
