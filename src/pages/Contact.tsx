import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { Box, LinearProgress } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import "src/css/Contact.css";

export default function Contact() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAtWNIGeRgynxY6sUVF3VNMximewP4WSsY"
  });

  if (!isLoaded) {
    return (
      <div className="progress">
        <LinearProgress />
      </div>
    );
  }

  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 59.459701, lng: 18.138355 }), []);

  return (
    <>
      <Helmet title="Contact" />
      <Box style={{ overflow: "scroll" }}>
        <div className="contact-container">
          <GoogleMap center={center} mapContainerClassName="map-container" mapTypeId={google.maps.MapTypeId.TERRAIN} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
          <div className="contact-info">
            <div className="contact-header">
              <h1>Kontakta oss</h1>
            </div>
            <div className="contact-col">
              <div className="contact-col-1">
                <ul>
                  <h2>Öppettider</h2>
                  <br />
                  <li>
                    <b>Måndag - Fredag</b>
                  </li>
                  <li>9:00 - 19:00</li>
                  <br />
                  <li>
                    <b>Lördag - Söndag</b>
                  </li>
                  <li>11:00 - 18:00</li>
                </ul>
              </div>
              <div className="contact-col-2">
                <section>
                  <ul>
                    <li>
                      <b>Besöksadress</b>
                    </li>
                    <li>
                      <p>
                        Saluvägen 5
                        <br />
                        187 66 Täby
                      </p>
                    </li>
                    <br />
                    <li>
                      <b>Telefonummer</b>
                    </li>
                    <li>079-306 00 15</li>
                    <br />
                    <li>
                      <b>Hemsida</b>
                    </li>
                    <li>
                      <a href="#">www.tbr-appen.se</a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
