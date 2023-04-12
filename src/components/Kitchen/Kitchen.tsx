/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import KitchenCode from "../KitchenCode/KitchenCode";
import KitchenTime from "../KitchenTime/KitchenTime";
import QueueSlider from "../QueueSlider/QueueSlider";

import "src/css/Kitchen.css";

export default function Kitchen() {
  const [kitchen, setKitchen] = useState<Kitchen>();
  const [, setKitchenIsLoading] = useState(false);

  useEffect(() => {
    setKitchenIsLoading(true);
    const path = `/api/Kitchen/`;
    axios
      .get(path)
      .then((response) => {
        setKitchen(response.data);
        setKitchenIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Helmet title="Kitchen" />
      <div className="kitchen-status-container">
        <div className="kitchen-status">
          <KitchenTime kitchen={kitchen} />
        </div>
        <div className="kitchen-status">
          <KitchenCode kitchen={kitchen} />
        </div>
        <div className="kitchen-status">
          <QueueSlider kitchen={kitchen} />
        </div>
      </div>
    </>
  );
}
