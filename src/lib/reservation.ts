// Lightweight global event bus for opening the reservation modal from anywhere.
type Listener = (priority: boolean) => void;
const listeners = new Set<Listener>();

export const openReservation = (priority = false) => {
  listeners.forEach((fn) => fn(priority));
};

export const onReservationOpen = (fn: Listener) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
