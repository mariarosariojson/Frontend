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
  const center = useMemo(() => ({ lat: 59.29790570266212, lng: 18.082348922490475 }), []);

  return (
    <>
      <Helmet title="Contact" />
      <Box>
        <section className="contact-container">
          <div className="map-container">
            <GoogleMap center={center} mapContainerClassName="map-container" mapTypeId={google.maps.MapTypeId.TERRAIN} zoom={15}>
              <Marker position={center} />
            </GoogleMap>
          </div>
          <div className="contact-info">
            <section className="contact-header">
              <div>
                <h1>Kontakta oss</h1>
              </div>
            </section>
            <div className="contact-col">
              <div className="contact-col-1">
                <section>
                  <ul>
                    <h1>Öppettider</h1>
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
                </section>
              </div>
              <div className="contact-col-2">
                <section>
                  <ul>
                    <li>
                      <b>Besöksadress</b>
                    </li>
                    <li>
                      <p>
                        En gata 12
                        <br />
                        123 45 Täby
                      </p>
                    </li>
                    <br />
                    <li>
                      <b>Telefonummer</b>
                    </li>
                    <li>08-1234 123 456</li>
                    <br />
                    <li>
                      <b>Hemsida</b>
                    </li>
                    <li>
                      <a href="#">www.entbrapp.se</a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
}
