import { useState, useEffect } from "react";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchBookings();
  }, []);

  function fetchBookings() {
    setLoading(true);
    fetch(`${apiURL}/api/bookings/`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load bookings");
        setLoading(false);
      });
  }

  function deleteBooking(id) {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    fetch(`${apiURL}/api/bookings/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== id));
      })
      .catch((error) => {
        setError("Failed to delete booking");
      });
  }

  function updateBookingStatus(id, newStatus) {
    fetch(`${apiURL}/api/bookings/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedBooking) => {
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? updatedBooking : booking
          )
        );
      })
      .catch((error) => {
        setError("Failed to update booking status");
      });
  }

  function getStatusBadgeClass(status) {
    const classes = {
      pending: "status-badge status-pending",
      confirmed: "status-badge status-confirmed",
      cancelled: "status-badge status-cancelled",
      completed: "status-badge status-completed",
    };
    return classes[status] || "status-badge";
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatTime(timeString) {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="booking-list-container">
      <div className="booking-list-header">
        <h2>Bookings</h2>
        <div className="filter-buttons">
          <button
            className={`btn ${filter === "all" ? "btn__primary" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({bookings.length})
          </button>
          <button
            className={`btn ${filter === "pending" ? "btn__primary" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending ({bookings.filter((b) => b.status === "pending").length})
          </button>
          <button
            className={`btn ${filter === "confirmed" ? "btn__primary" : ""}`}
            onClick={() => setFilter("confirmed")}
          >
            Confirmed ({bookings.filter((b) => b.status === "confirmed").length})
          </button>
          <button
            className={`btn ${filter === "completed" ? "btn__primary" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed ({bookings.filter((b) => b.status === "completed").length})
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredBookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.full_name}</h3>
                <span className={getStatusBadgeClass(booking.status)}>
                  {booking.status}
                </span>
              </div>

              <div className="booking-details">
                <p>
                  <strong>Service:</strong> {booking.service}
                </p>
                <p>
                  <strong>Email:</strong> {booking.email}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(booking.booking_date)}
                </p>
                <p>
                  <strong>Time:</strong> {formatTime(booking.booking_time)}
                </p>
                {booking.notes && (
                  <p>
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                )}
              </div>

              <div className="booking-actions">
                <select
                  value={booking.status}
                  onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  className="btn btn__danger"
                  onClick={() => deleteBooking(booking.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;
