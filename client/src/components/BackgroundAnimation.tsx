
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodeCount = 50;
    const initialNodes: Node[] = Array.from({ length: nodeCount }, () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5 + 0.1;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1
      };
    });

    setNodes(initialNodes);

    const updateNodes = () => {
      setNodes(prevNodes =>
        prevNodes.map(node => {
          let { x, y, vx, vy, radius } = node;

          // Update position with random movement
          x += vx;
          y += vy;

          // Add slight random changes to velocity
          vx += (Math.random() - 0.5) * 0.1;
          vy += (Math.random() - 0.5) * 0.1;

          // Limit maximum velocity
          const maxSpeed = 2;
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed;
            vy = (vy / speed) * maxSpeed;
          }

          // Bounce off walls
          if (x <= radius || x >= window.innerWidth - radius) {
            vx = -vx;
          }
          if (y <= radius || y >= window.innerHeight - radius) {
            vy = -vy;
          }

          // Keep within bounds
          x = Math.max(radius, Math.min(window.innerWidth - radius, x));
          y = Math.max(radius, Math.min(window.innerHeight - radius, y));

          return { x, y, vx, vy, radius };
        })
      );
    };

    const animationInterval = setInterval(updateNodes, 16);
    return () => clearInterval(animationInterval);
  }, []);

  const getDistance = (node1: Node, node2: Node) => {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      <svg className="w-full h-full">
        {nodes.map((node1, i) =>
          nodes.slice(i + 1).map((node2, j) => {
            const distance = getDistance(node1, node2);
            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.3;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke={isDark ? '#ffffff' : '#000000'}
                  strokeWidth={0.3}
                  strokeOpacity={opacity}
                />
              );
            }
            return null;
          })
        )}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            fill={isDark ? '#ffffff' : '#000000'}
            opacity={0.5}
          />
        ))}
      </svg>
    </div>
  );
}
