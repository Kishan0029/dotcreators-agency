import { useEffect } from "react";

export default function LiquidBackground() {
  useEffect(() => {
    // Create a temporary element to force the browser to resolve CSS variables
    const probe = document.createElement("div");
    probe.style.position = "absolute";
    probe.style.left = "-9999px";
    probe.style.top = "-9999px";
    document.body.appendChild(probe);

    // helper to read a CSS variable via computed style
    const readVar = (prop: string) => {
      probe.style.color = "";
      probe.style.background = "";
      probe.style.setProperty("color", `var(${prop})`);
      const c = getComputedStyle(probe).color;
      if (c && c !== "" && c !== "rgb(0, 0, 0)") return c;
      // fallback to reading background if variable maps to a non-color token
      try {
        probe.style.setProperty("background", `var(${prop})`);
        const b = getComputedStyle(probe).backgroundColor;
        if (b && b !== "" && b !== "rgba(0, 0, 0, 0)") return b;
      } catch (e) {
        // ignore
      }
      return "rgba(255,255,255,0)";
    };

    const fg = readVar("--foreground");
    const bg = readVar("--background");
    const accent = readVar("--accent");
    const aura1 = readVar("--aura-1");

    document.documentElement.style.setProperty("--liquid-fg", fg);
    document.documentElement.style.setProperty("--liquid-bg", bg);
    document.documentElement.style.setProperty("--liquid-accent", accent);
    document.documentElement.style.setProperty("--liquid-aura", aura1);

    document.body.removeChild(probe);
  }, []);

  return <div aria-hidden className="liquid-bg" />;
}
