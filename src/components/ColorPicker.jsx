import React from 'react';

const ColorPicker = ({ label, color, setColor }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ marginRight: '10px' }}>{label}:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
