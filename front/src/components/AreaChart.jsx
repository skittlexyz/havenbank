import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { ArrowBigDown, ArrowBigUp, CircleSmall, Minus, Plus } from "lucide-react";

const AreaChart = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef();
  const [tooltip, setTooltip] = useState({ display: 'none', content: null, x: 0, y: 0 });

  const graphIndicator = (value) => {
    if (value > 0) return <Plus size={64} color="var(--ok)" />;
    else if (value < 0) return <Minus size={64} color="var(--error)" />;
    else return <CircleSmall size={64} />;
  };

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

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

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height, 0]);

    const area = d3
      .area()
      .x((d, i) => x(i))
      .y0(height)
      .y1((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("d", area)
      .attr("fill", "url(#gradient1)");

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "var(--accent)")
      .attr("stroke-width", 4);

    // Add points at intersections of Y-axis ticks and X-axis ticks
    svg
      .selectAll(".intersection")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "intersection")
      .attr("cx", (d, i) => x(i))
      .attr("cy", (d) => y(d.value))
      .attr("r", 6)
      .attr("fill", "var(--accent)")
      .on("mouseover", (event, d) => {
        // Calculate tooltip position based on mouse event
        const xMargin = -240;
        const yMargin = 15;

        const containerWidth = document.querySelector("#chart").getBoundingClientRect().width;
        const containerHeight = document.querySelector("#chart").getBoundingClientRect().height;

        // Calculate X position
        let x = event.clientX + xMargin;
        if (x >= containerWidth) {
          x = x + (xMargin * 0.875);
        }

        // Calculate Y position
        let y = event.clientY + yMargin;
        console.log(tooltipRef.current.offsetHeight)
        if (y >= containerHeight) {
          y = y - 200;
        }

        // Update tooltip content and position
        setTooltip({
          display: 'absolute',
          content: (
            <>
              {graphIndicator(Math.random() - 0.5)}
              <div className="flex flex-col justify-center items-end">
                <p className="text-3xl !font-white">
                  <span className="text-sm">R$</span>{String(d.value.toFixed(2)).replace(".", ",")}
                </p>
                <p className="text-sm !font-[var(--u-icon)]">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </>
          ),
          x: x,
          y: y,
        });
      })
      .on("mouseout", () => {
        setTooltip({ display: 'none', content: null, x: 0, y: 0 });
      });
  }, [data]);

  return (
    <div className="w-fit relative">
      <svg id="chart" ref={svgRef}></svg>

      {/* Tooltip rendering */}
      <div
        ref={tooltipRef}
        className={`${tooltip.display === 'none' ? 'hidden' : 'absolute'} 
          font-bold p-3 pl-1 gap-1 rounded-lg flex justify-center items-center !text-white bg-[var(--overlay)]/50 backdrop-blur-md w-48 h-24`}
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
