import { useState, useEffect } from "react";
import { SettingsIcon, XIcon, MoonIcon, SunIcon, BellIcon, ShieldIcon, UserIcon, EditIcon } from "./Icons";
import "../styles/Settings.css";

export default function Settings({ isOpen, onClose, user }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') !== 'false');
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({
    name: user.name,
    role: user.role,
    email: user.email || 'user@example.com',
    phone: user.phone || '+1 (555) 123-4567',
    department: user.department || 'Engineering',
    location: user.location || 'San Francisco, CA'
  });

  // Apply theme on mount and when changed
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNotificationToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', newValue.toString());
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes - in a real app, this would update the user in the backend
      console.log('Saving user changes:', editableUser);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditableUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title">
            <SettingsIcon />
            <h2>Settings</h2>
          </div>
          <button className="settings-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Section */}
          <div className="settings-section">
            <div className="settings-section-header">
              <UserIcon />
              <h3>Profile Information</h3>
              <button className="edit-btn" onClick={handleEditToggle}>
                <EditIcon />
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Full Name</div>
                {isEditing ? (
                  <input
                    type="text"
                    className="settings-input"
                    value={editableUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  <div className="settings-item-value">{editableUser.name}</div>
                )}
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Email Address</div>
                {isEditing ? (
                  <input
                    type="email"
                    className="settings-input"
                    value={editableUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <div className="settings-item-value">{editableUser.email}</div>
                )}
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Phone Number</div>
                {isEditing ? (
                  <input
                    type="tel"
                    className="settings-input"
                    value={editableUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <div className="settings-item-value">{editableUser.phone}</div>
                )}
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Role</div>
                {isEditing ? (
                  <select
                    className="settings-select"
                    value={editableUser.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  >
                    <option value="Senior Engineer">Senior Engineer</option>
                    <option value="Engineering Manager">Engineering Manager</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                  </select>
                ) : (
                  <div className="settings-item-value">{editableUser.role}</div>
                )}
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Department</div>
                {isEditing ? (
                  <select
                    className="settings-select"
                    value={editableUser.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">Human Resources</option>
                  </select>
                ) : (
                  <div className="settings-item-value">{editableUser.department}</div>
                )}
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Location</div>
                {isEditing ? (
                  <input
                    type="text"
                    className="settings-input"
                    value={editableUser.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                ) : (
                  <div className="settings-item-value">{editableUser.location}</div>
                )}
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="settings-section">
            <div className="settings-section-header">
              <SunIcon />
              <h3>Appearance</h3>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Theme</div>
                <div className="settings-item-value">Choose your preferred theme</div>
              </div>
              <div className="theme-toggle-group">
                <button 
                  className={`theme-btn ${theme === 'light' ? 'theme-btn--active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <SunIcon />
                  Light
                </button>
                <button 
                  className={`theme-btn ${theme === 'dark' ? 'theme-btn--active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <MoonIcon />
                  Dark
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="settings-section">
            <div className="settings-section-header">
              <BellIcon />
              <h3>Notifications</h3>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Push Notifications</div>
                <div className="settings-item-value">
                  {notifications ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications}
                  onChange={handleNotificationToggle}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Email Notifications</div>
                <div className="settings-item-value">Get updates via email</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Weekly Summary</div>
                <div className="settings-item-value">Receive weekly activity summary</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Security Section */}
          <div className="settings-section">
            <div className="settings-section-header">
              <ShieldIcon />
              <h3>Security</h3>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Session Management</div>
                <div className="settings-item-value">Manage your active sessions</div>
              </div>
              <button className="settings-btn">Manage Sessions</button>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Two-Factor Authentication</div>
                <div className="settings-item-value">Add an extra layer of security</div>
              </div>
              <button className="settings-btn">Enable 2FA</button>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Password</div>
                <div className="settings-item-value">Change your password</div>
              </div>
              <button className="settings-btn">Change Password</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <button className="settings-btn settings-btn--secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
