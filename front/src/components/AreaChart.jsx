import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const AreaChart = ({ data }) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState({ display: 'none', content: '', x: 0, y: 0 });

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG container using Tailwind classes
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient1")
      .attr("x1", "0%")
      .attr("y1", "00%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(from var(--accent) r g b / 0.5)");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(from var(--accent) r g b / 0)");

    const x = d3.scaleLinear() // Use linear scale for the x-axis (instead of scaleTime)
      .domain([0, data.length - 1]) // Set the domain to the indices of your data array
      .range([0, width]); // Spread the range across the width

    const y = d3.scaleLinear() // Use scaleLinear for the y-axis since it's numeric
      .domain([0, d3.max(data, (d) => d.value)]) // Find the max value for the y-axis
      .nice()
      .range([height, 0]);

    const area = d3
      .area()
      .x((d, i) => x(i)) // Use index for x position
      .y0(height)
      .y1((d) => y(d.value));

    // Add the area path with Tailwind styles
    svg
      .append("path")
      .datum(data)
      .attr("d", area)
      .attr("fill", "url(#gradient1)"); // Tailwind for path styling

    const line = d3
      .line()
      .x((d, i) => x(i)) // Same x position as area path
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("d", line) // Set the path data using the line generator
      .attr("fill", "none") // Make sure the line has no fill
      .attr("stroke", "var(--accent)") // Line color
      .attr("stroke-width", 4);

    // Add the X axis (custom text labels)
    // const xAxis = svg
    //   .append("g")
    //   .attr("transform", `translate(0,${height})`);

    // xAxis
    //   .selectAll("text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .attr("x", (d, i) => x(i)) // Position each label based on the index
    //   .attr("y", 20) // Vertical position of the text labels
    //   .style("text-anchor", "middle")
    //   .style("font-size", "14px")
    //   .style("fill", "var(--u-icon)")
    //   .style("font-family", "Public Sans")
    //   .text((d) => d.date); // Display raw date from the data

    // // Add the Y axis with Tailwind classes for styling
    // const yAxis = svg
    //   .append("g")
    //   .call(d3.axisLeft(y).ticks(5).tickSize(10)); // Limit the number of Y-axis ticks to 5

    // yAxis
    //   .selectAll("line")
    //   .style("stroke", "var(--u-icon)") // Line color
    //   .style("stroke-width", 1); // Line width

    // yAxis
    //   .selectAll("text")
    //   .style("font-size", "14px")
    //   .style("fill", "var(--u-icon)")
    //   .style("font-family", "Public Sans");

    // Add points at intersections of Y-axis ticks and X-axis ticks
    svg
      .selectAll(".intersection")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "intersection")
      .attr("cx", (d, i) => x(i)) // X position from index
      .attr("cy", (d) => y(d.value)) // Y position based on the value
      .attr("r", 5) // Radius of the circle
      .attr("fill", "var(--accent)") // Point color
      .style("cursor", "pointer") // Change cursor to indicate interactivity
      .on("mouseover", (event, d) => {
        // Adjust tooltip to appear next to the mouse cursor
        setTooltip({
          display: 'absolute',
          content: `Date: ${d.date}, Value: ${d.value}`,
          x: event.clientX + window.scrollX + 15, // Adjust X position of tooltip to the right of the cursor
          y: event.clientY + window.scrollY + 15, // Adjust Y position of tooltip slightly below the cursor
        });
      })
      .on("mouseout", () => {
        setTooltip({ display: 'none', content: '', x: 0, y: 0 }); // Hide tooltip on mouseout
      });

  }, [data]);

  return (
    <div className="w-fit">
      <svg ref={svgRef}></svg>

      {/* Tooltip with Tailwind CSS */}
      <div
        className={`absolute ${tooltip.display === 'none' ? 'hidden' : 'block'} 
          bg-black bg-opacity-70 text-white p-2 rounded-md text-xs transition-all duration-300 pointer-events-none`}
        style={{
          left: tooltip.x,
          top: tooltip.y,
        }}
      >
        {tooltip.content}
      </div>
    </div>
  );
};

export default AreaChart;
