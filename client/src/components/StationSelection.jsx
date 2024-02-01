import React, { useState } from "react";

const StationsSelection = ({ stations }) => {
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const [info, setInfo] = useState(null);

  const handleStartStationChange = (event) => {
    setStartStation(event.target.value);
  };

  const handleEndStationChange = (event) => {
    setEndStation(event.target.value);
  };

  const handleGenerateTicket = async () => {
    setError(null);
    if (startStation === "" || endStation === "") {
      return setError("All station names must be filled");
    }
    if(startStation === endStation){
      return setError("Starting and ending station cannot be same");
    }
    const startPrice = stations[startStation]?.price || 0;
    const endPrice = stations[endStation]?.price || 0;
    const totalPrice = Math.abs(endPrice - startPrice);

    const requestBody = {
      price: totalPrice,
      startStation: startStation,
      endStation: endStation,
    };

    const res = await fetch("http://localhost:8080/api/ticket/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    if (!res.ok) {
      return setError(res.message || "Something went wrong!");
    }
    setTicket(data);
    console.log(data);
  };

  const handleEnterStation = async () => {

    const res = await fetch(`http://localhost:8080/api/ticket/enter/${ticket.id}`)
    console.log(res)
    const data = await res.json();
    console.log(data)
    setInfo(data.message);

  } 

  const handleExitStation = async () => {
    setShowTicket(false)
    const res = await fetch(`http://localhost:8080/api/ticket/exit/${ticket.id}`)
    const data = await res.json();
    setInfo(data.message);

  }

  const handleShowTicketDetails = async () => {
    setShowTicket(false)
    const res = await fetch(`http://localhost:8080/api/ticket/${ticket.id}`)
    const data = await res.json()
    setTicket(data.data);
    setShowTicket(prev => !prev);
  }

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex gap-4 p-4 items-center justify-center">
          <label htmlFor="startStation">Starting Station:</label>
          <select
            id="startStation"
            value={startStation}
            onChange={handleStartStationChange}
            className="border border-black/70 rounded-lg"
          >
            <option value="">Select Starting Station</option>
            {Object.keys(stations).map((stationKey) => (
              <option key={stationKey} value={stationKey}>
                {stationKey}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 p-4 items-center justify-center">
          <label htmlFor="endStation">Ending Station:</label>
          <select
            id="endStation"
            value={endStation}
            onChange={handleEndStationChange}
            className="border border-black/70 rounded-lg"
          >
            <option value="">Select Ending Station</option>
            {Object.keys(stations).map((stationKey) => (
              <option key={stationKey} value={stationKey}>
                {stationKey}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleGenerateTicket}
        className="mt-8 border border-gray-600 rounded-xl py-2 hover:bg-slate-300 bg-slate-200"
      >
        Generate Ticket
      </button>

      {error && (
        <p className="flex truncate items-center mt-6 justify-center text-rose-700">
          {error}
        </p>
      )}
      {ticket && (
        <p className="flex truncate items-center mt-6 justify-center text-green-800">
          Your Ticket Id : <span className="font-bold text-lg">{ticket.id}</span>
        </p>
      )}

      {ticket && (
        <div className="mt-6 flex gap-6 justify-center items-center">
          <div>
            <button onClick={handleEnterStation} className="bg-gray-100 p-4 rounded-lg hover:bg-gray-300">Enter Start Station</button>
          </div>
          <div>
            <button onClick={handleExitStation} className="bg-gray-100 p-4 rounded-lg hover:bg-gray-300">Enter Last Station</button>
          </div>
        </div>
      )}

      {info && (
        <div className="mt-6 text-red-900">{info}</div>
      )}

      {
        ticket && <button className="mt-6 text-slate-700 text-sm hover:underline" onClick={handleShowTicketDetails}>Show ticket information</button>
      }
      {showTicket && ticket && (
        <div className="flex flex-col">
          <p className="text-md text-slate-800">From : <span className="text-xl text-slate-800">{ticket.startStation}</span></p>
          <p className="text-md text-slate-800">To : <span className="text-xl text-slate-800">{ticket.endStation}</span></p>
          <p className="text-md text-slate-800">Price : <span className="text-xl text-slate-800">Rs {ticket.price}</span></p>
          <p className="text-md text-slate-800">Expire Date: <span className="text-xl text-slate-800">{ticket.expiryTime.split('T')[0]}</span></p>
          <p className="text-md text-slate-800">Expire Time: <span className="text-xl text-slate-800">{ticket.expiryTime.split('T')[1].split('.')[0]}</span></p>
          <p className="text-md text-slate-800">Ticket used for entering the station : <span className="text-xl text-slate-800">{ticket.ticketUsedEnter ? "Yes" : "No"}</span></p>
          <p className="text-md text-slate-800">Ticket used for exiting the station : <span className="text-xl text-slate-800">{ticket.ticketUsedExit ? "Yes" : "No"}</span></p>
        </div>
      )}
    </div>
  );
};

export default StationsSelection;
