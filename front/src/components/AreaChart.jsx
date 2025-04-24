import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { ArrowBigDown, ArrowBigUp, CircleSmall, Minus, Plus } from "lucide-react";

const AreaChart = ({ data, parentRef }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: (
      <>
        <CircleSmall size={64} />
        <div className="flex flex-col justify-center items-end">
          <p className="text-3xl !font-white">
            <span className="text-sm">R$</span>--,--
          </p>
          <p className="text-sm !font-[var(--u-icon)]">DD/MM/YYYY</p>
        </div>
      </>
    ),
    x: 0, y: 0
  });

  const graphIndicator = (value) => {
    if (value > 0) return <Plus size={64} color="var(--ok)" />;
    else if (value < 0) return <Minus size={64} color="var(--error)" />;
    else return <CircleSmall size={64} />;
  };

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    
    const parentWidth = (parentRef.current.getBoundingClientRect().width) * 0.5;
    
    const width = parentWidth - margin.left - margin.right;
    const height = (parentWidth / 2) - margin.top - margin.bottom;

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
      .attr("r", 7)
      .attr("fill", "var(--accent)")
      .on("mouseenter", (event, d) => {
        setTooltip((prev) => ({ ...prev, visible: true }));
      })
      .on("mousemove", (event, d) => {
        const chartProps = svgRef.current.getBoundingClientRect();
        const tooltipProps = tooltipRef.current.getBoundingClientRect();
      
        const xMargin = (tooltipProps.width) * -1 - 45;
        const yMargin = (tooltipProps.height / 2) * -1 + 15;
      
        let x = event.clientX + xMargin;
        if (x + tooltipProps.width >= chartProps.width) {
          x = x + (tooltipProps.width) * -1 - 45;
        }
      
        let y = event.clientY + yMargin;
        if (y + tooltipProps.height >= chartProps.height) {
          y = y + (tooltipProps.height) * -1 + 15;
        }
      
        setTooltip({
          visible: true,
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
      .on("mouseleave", () => {
        setTooltip((previousState) => ({ ...previousState, visible: false }));
      });
      
  }, [data]);

  return (
    <div className="w-fit h-fit relative border-2 rounded-xl border-[var(--overlay)] p-4">
      <svg id="chart" ref={svgRef}></svg>
      <div
        id="tooltip"
        ref={tooltipRef}
        className={`absolute transition-all duration-150 
    font-bold p-3 pl-1 gap-1 rounded-lg flex justify-center items-center !text-white 
    bg-[var(--overlay)]/50 backdrop-blur-md`}
        style={{
          left: tooltip.x,
          top: tooltip.y,
          visibility: tooltip.visible ? 'visible' : 'hidden',
          opacity: tooltip.visible ? 1 : 0,
          pointerEvents: tooltip.visible ? 'auto' : 'none',
        }}
      >
        {tooltip.content}
      </div>
    </div>
  );
};

export default AreaChart;
