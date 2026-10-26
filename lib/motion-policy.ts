export function motionPolicy(width: number, reduced: boolean, finePointer: boolean) {
  return {
    reduced,
    pinCases: !reduced && width > 900,
    count: !reduced,
    parallax: reduced ? 0 : width > 900 ? 70 : 24,
    magnetic: !reduced && finePointer,
  };
}
