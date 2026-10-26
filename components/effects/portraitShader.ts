export const portraitVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const portraitFragment = `
uniform sampler2D uPhoto;
uniform float uTime;
uniform float uHover;
uniform float uGlitch;
uniform float uAspect;
uniform float uImageAspect;
uniform vec2 uPointer;
uniform vec2 uTexel;
uniform vec3 uCyan;
uniform vec3 uMagenta;
varying vec2 vUv;
float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
void main() {
  vec2 uv = vUv;
  if (uAspect > uImageAspect) uv.y = (uv.y - .5) * uImageAspect / uAspect + .5;
  else uv.x = (uv.x - .5) * uAspect / uImageAspect + .5;
  float slice = floor(uv.y * 28.0);
  uv.x += (noise(vec2(slice, floor(uTime * 17.0))) - .5) * uGlitch * .035;
  vec4 photo = texture2D(uPhoto, uv);
  vec2 offset = vec2(.0007 + uHover * .003 + length(uPointer) * .001, 0.0);
  vec3 rgb = vec3(texture2D(uPhoto, uv + offset).r, photo.g, texture2D(uPhoto, uv - offset).b);
  float light = dot(rgb, vec3(.299,.587,.114));
  vec3 duo = mix(uMagenta, uCyan, light);
  rgb = mix(rgb, duo * (.35 + light * .8), .19);
  rgb += (noise(uv * 1700.0 + fract(uTime)) - .5) * .025;
  rgb *= 1.0 - .055 * (.5 + .5 * sin(uv.y / uTexel.y * 2.1));
  float scan = exp(-pow((uv.y - (1.0 - fract(uTime / 4.2))) * 55.0, 2.0));
  rgb += uCyan * scan * .11;
  float edge = max(max(texture2D(uPhoto, uv + vec2(uTexel.x * 2.0, 0.0)).a,
      texture2D(uPhoto, uv - vec2(uTexel.x * 2.0, 0.0)).a),
      max(texture2D(uPhoto, uv + vec2(0.0,uTexel.y * 2.0)).a,
      texture2D(uPhoto, uv - vec2(0.0,uTexel.y * 2.0)).a));
  float glow = max(0.0, edge - photo.a) * .5;
  gl_FragColor = vec4(rgb * photo.a + mix(uMagenta,uCyan,uv.x) * glow,
    max(photo.a, glow));
}`;
