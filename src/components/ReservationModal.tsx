import { useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultPriority?: boolean;
};

const SLOTS = [
  { time: "7:00 PM", left: 6 },
  { time: "8:00 PM", left: 3 },
  { time: "9:00 PM", left: 2 },
  { time: "10:00 PM", left: 4 },
  { time: "11:00 PM", left: 1 },
  { time: "12:00 AM", left: 5 },
];

export const ReservationModal = ({ open, onClose, defaultPriority = false }: Props) => {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [slot, setSlot] = useState<string | null>(null);
  const [priority, setPriority] = useState(defaultPriority);

  useEffect(() => {
    if (open) {
      setStep(1);
      setSlot(null);
      setPriority(defaultPriority);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, defaultPriority]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const totalLeft = useMemo(() => SLOTS.reduce((a, s) => a + s.left, 0), []);

  if (!open) return null;

  const confirm = () => {
    toast({
      title: priority ? "Priority request received" : "Table held for you",
      description: `${guests} guest${guests > 1 ? "s" : ""} · ${slot} · We'll text you to confirm.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center px-0 sm:px-4">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-noir/85 backdrop-blur-md animate-fade-in"
      />

      {/* Sheet */}
      <div
        className="relative w-full sm:max-w-lg glass-strong rounded-t-3xl sm:rounded-3xl p-6 md:p-8 max-h-[92vh] overflow-y-auto"
        style={{
          animation: "sheet-up 0.45s cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 -20px 80px hsl(0 0% 0% / 0.6), 0 0 0 1px hsl(var(--gold) / 0.25)",
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden mx-auto mb-4 h-1 w-10 rounded-full bg-foreground/20" />

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-eyebrow text-[10px] text-gold mb-2">
              <span className="inline-block h-px w-6 bg-gold/60 align-middle mr-2" />
              Reserve a Table
            </p>
            <h3 className="font-display font-black text-2xl md:text-3xl leading-tight">
              {step === 1 && "How many joining?"}
              {step === 2 && "Pick your moment"}
              {step === 3 && "Confirm your table"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 shrink-0 rounded-full border border-gold/30 grid place-items-center text-gold hover:bg-gold/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-7">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                n <= step ? "bg-gradient-gold" : "bg-foreground/15"
              }`}
            />
          ))}
        </div>

        {/* Step 1: guests */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between glass rounded-2xl p-5 mb-5">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="h-12 w-12 rounded-full border border-gold/40 text-gold text-xl active:scale-95 transition-transform"
                aria-label="Decrease guests"
              >
                −
              </button>
              <div className="text-center">
                <div className="font-display font-black text-5xl gold-text leading-none">{guests}</div>
                <div className="font-eyebrow text-[10px] text-foreground/60 mt-2">
                  {guests === 1 ? "Guest" : "Guests"}
                </div>
              </div>
              <button
                onClick={() => setGuests((g) => Math.min(12, g + 1))}
                className="h-12 w-12 rounded-full border border-gold/40 text-gold text-xl active:scale-95 transition-transform"
                aria-label="Increase guests"
              >
                +
              </button>
            </div>

            <label className="flex items-center justify-between gap-4 glass rounded-2xl p-4 cursor-pointer mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">VIP / Priority Booking</div>
                  <div className="text-xs text-foreground/55 mt-0.5">Skip the line · seated first</div>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={priority}
                onClick={() => setPriority((p) => !p)}
                className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
                  priority ? "bg-gradient-gold" : "bg-foreground/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-noir transition-transform duration-300 ${
                    priority ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>

            <button onClick={() => setStep(2)} className="gold-button w-full !py-4 active:scale-[0.99]">
              Continue
            </button>
          </div>
        )}

        {/* Step 2: time slots */}
        {step === 2 && (
          <div className="animate-fade-in">
            <p className="text-sm text-foreground/65 mb-4">
              <span className="text-gold font-semibold">{totalLeft} slots</span> remaining tonight.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {SLOTS.map((s) => {
                const selected = slot === s.time;
                const scarce = s.left <= 2;
                return (
                  <button
                    key={s.time}
                    onClick={() => setSlot(s.time)}
                    className={`relative rounded-2xl p-4 text-left border transition-all duration-300 active:scale-[0.98] ${
                      selected
                        ? "border-gold bg-gold/10 shadow-[0_0_24px_hsl(var(--gold)/0.4)]"
                        : "border-gold/15 bg-foreground/5 hover:border-gold/50 hover:bg-foreground/[0.07]"
                    }`}
                  >
                    <div className="font-display font-bold text-lg text-foreground">{s.time}</div>
                    <div
                      className={`font-eyebrow text-[10px] mt-1 ${
                        scarce ? "text-ember" : "text-foreground/55"
                      }`}
                    >
                      {scarce ? `Only ${s.left} left` : `${s.left} available`}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="ghost-button flex-1 !py-4 active:scale-[0.99]"
              >
                Back
              </button>
              <button
                onClick={() => slot && setStep(3)}
                disabled={!slot}
                className={`gold-button flex-1 !py-4 active:scale-[0.99] ${
                  !slot ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: confirm */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="glass rounded-2xl p-5 md:p-6 mb-5 space-y-4">
              <Row label="Guests" value={`${guests}`} />
              <Row label="Time" value={slot ?? ""} />
              <Row
                label="Tier"
                value={priority ? "Priority Entry" : "Standard"}
                highlight={priority}
              />
              <div className="hairline" />
              <p className="text-xs text-foreground/55 leading-relaxed">
                Reservations are held for 15 minutes past your time. We'll text you to confirm shortly.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="ghost-button flex-1 !py-4 active:scale-[0.99]"
              >
                Back
              </button>
              <button onClick={confirm} className="gold-button flex-1 !py-4 active:scale-[0.99]">
                🔥 Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="font-eyebrow text-[10px] text-foreground/55">{label}</span>
    <span className={`font-display font-bold text-base ${highlight ? "gold-text" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);
