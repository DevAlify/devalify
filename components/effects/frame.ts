export function motionAllowed(reduced: boolean, visible: boolean, inView: boolean) {
  return !reduced && visible && inView;
}

export function frameDue(now: number, previous: number, mobile: boolean) {
  return now - previous >= 1000 / (mobile ? 30 : 60);
}
