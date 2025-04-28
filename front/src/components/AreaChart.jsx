import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { CircleSmall, Minus, Plus } from "lucide-react";
import { formatMoney } from "../utils";

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
    const parentWidth = (parentRef.current.getBoundingClientRect().width);
    const parentHeight = (parentRef.current.getBoundingClientRect().height);
    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Update y-scale to handle negative values
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value) * 1.1, d3.max(data, d => d.value) * 1.1]) // Add 10% padding
      .nice()
      .range([height, 0]);

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    // Add a prominent zero baseline
    const zeroY = y(0);
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", zeroY)
      .attr("x2", width)
      .attr("y2", zeroY)
      .attr("stroke", "var(--overlay)")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "10")
      .attr("opacity", 1);

    // Update gradient to handle negative values
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient1")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(from var(--accent) r g b / 0.5)");

    gradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "rgb(from var(--accent) r g b / 0.1)");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(from var(--accent) r g b / 0)");

    // Update area generator to handle negative values
    const area = d3.area()
      .x((d, i) => x(i))
      .y0(y(0)) // Baseline at y=0
      .y1(d => y(d.value));

    svg.append("path")
      .datum(data)
      .attr("d", area)
      .attr("fill", "url(#gradient1)");

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.value));

    svg.append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "var(--accent)")
      .attr("stroke-width", 4);

    // Add points (keep existing code)
    svg.selectAll(".intersection")
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
        const container = svgRef.current.parentElement.getBoundingClientRect();
        const tooltip = tooltipRef.current.getBoundingClientRect();
        
        // Posição do mouse relativa ao container do gráfico
        const mouseX = event.clientX - container.left;
        const mouseY = event.clientY - container.top;
        
        // Margem de segurança para o tooltip não sair da tela
        const margin = 10;
        
        // Calcula a posição X do tooltip
        let xPos = mouseX + margin;
        if (xPos + tooltip.width > container.width) {
          xPos = mouseX - tooltip.width - margin;
        }
        
        // Calcula a posição Y do tooltip
        let yPos = mouseY + margin;
        if (yPos + tooltip.height > container.height) {
          yPos = mouseY - tooltip.height - margin;
        }
        
        // Limita a posição dentro do container
        xPos = Math.max(margin, Math.min(xPos, container.width - tooltip.width - margin));
        yPos = Math.max(margin, Math.min(yPos, container.height - tooltip.height - margin));
        
        setTooltip({
          visible: true,
          content: (
            <>
              {graphIndicator(d.value)}
              <div className="flex flex-col justify-center items-end">
                <p className="text-3xl !font-white">
                  <span className="text-sm">R$</span>{formatMoney(d.value)}
                </p>
                <p className="text-sm !font-[var(--u-icon)]">{d.date}</p>
              </div>
            </>
          ),
          x: xPos,
          y: yPos,
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
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
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