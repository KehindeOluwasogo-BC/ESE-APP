import { useState } from "react";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

function Booking() {
  const [activeTab, setActiveTab] = useState("create");
  const [refreshList, setRefreshList] = useState(0);

  function handleBookingCreated(newBooking) {
    setActiveTab("view");
    setRefreshList(prev => prev + 1);
  }

  return (
    <div className="booking-container">
      <div className="booking-tabs">
        <button
          className={`tab-button ${activeTab === "create" ? "active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create Booking
        </button>
        <button
          className={`tab-button ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View Bookings
        </button>
      </div>

      <div className="booking-content">
        {activeTab === "create" ? (
          <BookingForm onBookingCreated={handleBookingCreated} />
        ) : (
          <BookingList key={refreshList} />
        )}
      </div>
    </div>
  );
}

export default Booking;
