type ParticlePoint = {
  idx: number;
  position: [number, number, number];
  color: string;
};

function createRing(count: number, radius: number, z: number, colors: string[]) {
  return Array.from({ length: count }, (_, idx) => {
    const angle = (idx / count) * Math.PI * 2;
    const color = colors[idx % colors.length];

    return {
      idx,
      position: [Math.cos(angle) * radius, Math.sin(angle) * radius, z] as [number, number, number],
      color,
    };
  });
}

export const pointsInner = createRing(18, 3.4, 0.2, ["#7c3aed", "#a78bfa", "#38bdf8"]);
export const pointsOuter = createRing(26, 5.8, -0.12, ["#38bdf8", "#22d3ee", "#22c55e"]);
