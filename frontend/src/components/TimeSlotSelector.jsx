import React from 'react';

const TimeSlotSelector = ({ slots, onSelect }) => {
  if (!slots.length) return <p>No slots available</p>;

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {slots.map((slot, i) => (
        <button
          key={i}
          onClick={() => onSelect(slot)}
          className="p-2 bg-blue-100 hover:bg-blue-500 hover:text-white rounded"
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
