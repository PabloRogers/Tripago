import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import "./TripList.css";

export default function TripList() {
  const [url, setUrl] = useState("http://localhost:3000/trips");

  const { data: trips } = useFetch(url);

  console.log(trips);
  return (
    <div className="trip-list">
      <ul>
        {trips
          ? trips.map((trip) => (
              <li key={trip.id}>
                <h3>{trip.title}</h3>
                <p>{trip.price}</p>
              </li>
            ))
          : null}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}
        >
          Europen Trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
}
