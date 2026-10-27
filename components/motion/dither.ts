const TILE = 128;

/** Noise tile that removes banding from the dark gradients, painted once as a data URL. */
export function paintDither(element: HTMLElement | null): void {
  if (!element) return;
  const tile = document.createElement('canvas');
  tile.width = TILE; tile.height = TILE;
  const context = tile.getContext('2d');
  if (!context) return;
  const image = context.createImageData(TILE, TILE);
  for (let i = 0; i < image.data.length; i += 4) {
    const value = Math.floor(Math.random() * 255);
    image.data[i] = value; image.data[i + 1] = value; image.data[i + 2] = value; image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  element.style.backgroundImage = `url(${tile.toDataURL()})`;
}
