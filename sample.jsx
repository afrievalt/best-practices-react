import React, { useRef, useState, createContext } from "react";
import mapboxgl from "mapbox-gl";
import { mapboxglAccessToken } from "../../.secretes";
import useEffectOnce from "../../hooks/useEffectOnce";
export const MapContext = createContext();
mapboxgl.accessToken = mapboxglAccessToken;
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MILWAUKEE = {
  lat: 43.0292238997657,
  lng: -87.9368712076874,
};

const Card = () => null;

export default function MiniMap({
  children,
  title,
  defaultCoordinates,
  homeCoordinates,
}) {
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const showToast = useShowToast();
  const handleChangeCoordinates = ({ latitude, longitude }) => {
    const isInsideFence = fenceCheck(latitude, longitude);
    isInsideFence
      ? setCoordinates({ latitude, longitude })
      : showToast("Invalid location.");
  };
  const distance = calculateDifference(homeCoordinates, coordinates, "miles");

  return (
    <Card>
      <MapCardHeader>{title}</MapCardHeader>
      <CardContent>
        <Map coordinates={coordinates} onChange={handleChangeCoordinates} />
        {children}
      </CardContent>
      <CardFooter>Your are {distance} from home.</CardFooter>
    </Card>
  );
}
