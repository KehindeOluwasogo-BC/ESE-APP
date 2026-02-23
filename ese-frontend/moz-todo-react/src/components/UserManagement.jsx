import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    service: "",
    notes: ""
  });

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!user?.is_superuser) {
      setError("Access denied. Only super users can access this page.");
      setLoading(false);
    } else {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${apiURL}/api/auth/users/list/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = (selectedUserId) => {
    const userToBook = users.find(u => u.id === selectedUserId);
    setSelectedUser(userToBook);
    setShowBookingForm(true);
    setError("");
    setSuccess("");
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${apiURL}/api/booking/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          user_id: selectedUser.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Booking created successfully for ${selectedUser.username}!`);
        setBookingData({
          date: "",
          time: "",
          service: "",
          notes: ""
        });
        setShowBookingForm(false);
        setSelectedUser(null);
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Failed to create booking:', error);
      setError('Failed to create booking');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!user?.is_superuser) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Access Denied</h2>
          <p style={{ color: 'red' }}>Only super users can access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container" style={{ maxWidth: '1000px' }}>
      <div className="profile-card">
        <h2 style={{ 
          fontSize: '2.8rem', 
          marginBottom: '2rem', 
          textAlign: 'center',
          color: '#333'
        }}>
          User Management
        </h2>

        {/* Messages */}
        {error && (
          <div className="error-message" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{ marginBottom: '1.5rem' }}>
            {success}
          </div>
        )}

        {/* Booking Form */}
        {showBookingForm && selectedUser && (
          <div style={{ 
            marginBottom: '2rem', 
            padding: '2rem', 
            background: '#f0f8ff',
            border: '2px solid #007bff',
            borderRadius: '8px'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              Create Booking for: <strong>{selectedUser.username}</strong>
            </h3>
            <form onSubmit={handleSubmitBooking}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleBookingInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleBookingInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="service">Service *</label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={bookingData.service}
                  onChange={handleBookingInputChange}
                  required
                  placeholder="e.g., Consultation, Appointment"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleBookingInputChange}
                  rows="3"
                  placeholder="Additional notes..."
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'white',
                    background: '#28a745',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Create Booking
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm(false);
                    setSelectedUser(null);
                    setBookingData({ date: "", time: "", service: "", notes: "" });
                  }}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#333',
                    background: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* User List */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>
            Regular Users ({users.length})
          </h3>
          
          {users.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No users found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '0.95rem'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Username</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userItem) => (
                    <tr key={userItem.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '1rem' }}>
                        <strong>{userItem.username}</strong>
                      </td>
                      <td style={{ padding: '1rem' }}>{userItem.full_name || '-'}</td>
                      <td style={{ padding: '1rem' }}>{userItem.email}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => handleCreateBooking(userItem.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem',
                            color: 'white',
                            background: '#007bff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Create Booking
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
