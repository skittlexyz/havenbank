import React, { useState, useRef } from 'react';

const TransactionTooltip = ({ content, children }) => {
  const tooltipRef = useRef(null);  // Ref for the tooltip
  const containerRef = useRef(null); // Ref for the container
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Margin to avoid the tooltip being too close to the cursor
    const xMargin = 10;
    const yMargin = 10;

    // Get the container and tooltip dimensions
    const container = containerRef.current;
    const tooltip = tooltipRef.current;

    let x = e.clientX + xMargin;
    let y = e.clientY + yMargin;

    // Adjust tooltip position if it exceeds the container bounds
    if (e.clientX + tooltip.offsetWidth >= container.offsetWidth) {
      x = x - tooltip.offsetWidth - (xMargin * 2);
    }
    if (e.clientY + tooltip.offsetHeight >= container.offsetHeight) {
      y = y - tooltip.offsetHeight - (yMargin * 1);
    }

    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"  // Container needs to be a relative parent
      onMouseMove={handleMouseMove}
    >
      {children}
      {/* TransactionTooltip element */}
      <div
        ref={tooltipRef}
        id="tooltip"
        className="absolute bg-black text-white p-2 rounded-lg shadow-lg"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          pointerEvents: 'none', // So it doesn't block mouse events
          visibility: content ? 'visible' : 'hidden',
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default TransactionTooltip;
