export function haptic(ms = 12) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  } catch {
    /* ignore */
  }
}

export function hapticSelect() {
  haptic(8);
}

export function hapticSuccess() {
  try {
    navigator.vibrate?.([12, 40, 18]);
  } catch {
    /* ignore */
  }
}
