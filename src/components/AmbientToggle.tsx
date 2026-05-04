import { useEffect, useRef, useState } from "react";

/** Tiny ambient audio toggle — pure WebAudio drone (no asset). Desktop only. */
export const AmbientToggle = () => {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(null);

  useEffect(() => {
    return () => {
      try {
        nodesRef.current?.oscs.forEach((o) => o.stop());
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  const toggle = async () => {
    if (!on) {
      try {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx: AudioContext = ctxRef.current || new Ctx();
        ctxRef.current = ctx;
        if (ctx.state === "suspended") await ctx.resume();

        const gain = ctx.createGain();
        gain.gain.value = 0;
        gain.connect(ctx.destination);

        const freqs = [110, 165, 220]; // warm A-based drone
        const oscs = freqs.map((f) => {
          const o = ctx.createOscillator();
          o.type = "sine";
          o.frequency.value = f;
          const g = ctx.createGain();
          g.gain.value = 0.06;
          o.connect(g).connect(gain);
          o.start();
          return o;
        });

        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        nodesRef.current = { gain, oscs };
        setOn(true);
      } catch {}
    } else {
      const ctx = ctxRef.current;
      const nodes = nodesRef.current;
      if (ctx && nodes) {
        nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        setTimeout(() => {
          try { nodes.oscs.forEach((o) => o.stop()); } catch {}
        }, 500);
      }
      setOn(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className="hidden md:flex fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full glass-strong items-center justify-center group hover:border-gold transition-all duration-500"
      style={{ boxShadow: on ? "0 0 30px hsl(var(--gold) / 0.4)" : "none" }}
    >
      <div className="flex items-end gap-[3px] h-4">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block w-[2px] bg-gold rounded-full"
            style={{
              height: on ? "100%" : "30%",
              animation: on ? `eq-bar 0.9s ease-in-out ${i * 0.12}s infinite alternate` : "none",
              transition: "height 0.4s ease",
            }}
          />
        ))}
      </div>
    </button>
  );
};
