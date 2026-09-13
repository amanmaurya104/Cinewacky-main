/**
 * Embers and steam lifting off the trays, behind the dragon.
 *
 * One buffer, no per-frame writes: each point carries its own lane and phase
 * and works out where it should be from uTime, so the whole field costs one
 * draw call and nothing on the CPU.
 */

export const emberVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uField;
  uniform float uRise;

  attribute vec3 aSeed;    // x: lane, y: phase, z: depth and size jitter
  attribute float aWarm;

  varying float vWarm;
  varying float vLife;

  void main() {
    float life = fract(aSeed.y + uTime * uRise);

    float x = (aSeed.x - 0.5) * uField * 2.2
            + sin(uTime * 0.35 + aSeed.y * 34.0) * uField * 0.11;
    float y = mix(-uField * 0.62, uField * 0.75, life);
    float z = (aSeed.z - 0.5) * uField * 0.9;

    vec4 mv = modelViewMatrix * vec4(x, y, z, 1.0);

    vWarm = aWarm;
    // In and out at both ends, so nothing pops into or out of the frame.
    vLife = sin(life * 3.14159265);

    gl_PointSize = uSize * (0.4 + aSeed.z) * (14.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

export const emberFragment = /* glsl */ `
  precision mediump float;

  uniform float uOpacity;
  uniform vec3  uEmber;
  uniform vec3  uSteam;

  varying float vWarm;
  varying float vLife;

  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = dot(d, d);
    if (r > 0.25) discard;

    float disc = 1.0 - smoothstep(0.0, 0.25, r);
    vec3 c = mix(uSteam, uEmber, vWarm);

    gl_FragColor = vec4(c, uOpacity * vLife * disc * disc);
  }
`;
