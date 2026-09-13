'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { emberFragment, emberVertex } from './emberShaders';

/**
 * The loong that swims behind the Test of China page.
 *
 * The model is MAXDESIGN-3D's Chinese dragon under CC-BY-4.0, rigged and
 * carrying a 57s swim cycle of its own, rebuilt for the web by
 * scripts/build-dragon-model.mjs. It is graded rather than lit naturalistically:
 * the film is a market that opens on charcoal in the dark and is packed up by
 * mid-morning, so the dragon is ember-hot over the night sections and has gone
 * to cold steam by the time the page reaches daylight. Scroll drives that and
 * walks the animal down the page; the pointer only turns it.
 *
 * Everything here is deferred. The page is designed to stand up without the
 * dragon, and 3MB does not go on the critical path for an element nobody is
 * reading.
 */

const PALETTE = {
  gold: 0xffc96b,
  ember: 0xe2452a,
  deep: 0x6e2011,
  steam: 0x8fa8b8,
} as const;

const MODEL = '/documentaries/test-of-china/dragon.glb';

const CAMERA_FOV = 42;
const CAMERA_Z = 14;

function sizingFor(aspect: number) {
  const worldH = 2 * Math.tan((CAMERA_FOV * Math.PI) / 180 / 2) * CAMERA_Z;
  return { worldH, worldW: worldH * aspect };
}

/** A frame-rate independent lerp factor, so it tracks the same on 60 and 144Hz. */
function damp(rate: number, dt: number): number {
  return 1 - Math.pow(1 - rate, dt * 60);
}

export default function DragonLoong() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(max-width: 820px)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !coarse,
        powerPreference: 'high-performance',
      });
    } catch {
      // No WebGL. The page's own gradient stands in for the dragon.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    // The dragon is mostly emissive, so without a filmic curve the ember just
    // clips to white wherever the body crosses itself.
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    camera.position.z = CAMERA_Z;

    let { worldW, worldH } = sizingFor(camera.aspect);
    let portrait = window.innerWidth < window.innerHeight;

    const ember = new THREE.Color(PALETTE.ember);
    const gold = new THREE.Color(PALETTE.gold);
    const steam = new THREE.Color(PALETTE.steam);
    const deep = new THREE.Color(PALETTE.deep);

    /* ---- light ---------------------------------------------------------- */

    /**
     * The environment, painted rather than loaded.
     *
     * A PBR material with no environment map has nothing to reflect, which is
     * why the dragon first read as a flat plastic toy however the lights were
     * set. This paints a tiny equirectangular sky out of the page's own two
     * light sources, charcoal glowing from below and the first cold daylight
     * above, and hands it to PMREM. It costs 8KB and does most of the work that
     * the directional lights were failing to do.
     */
    function paintEnvironment(): THREE.Texture {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      if (!ctx) return new THREE.CanvasTexture(canvas);

      const sky = ctx.createLinearGradient(0, 0, 0, 32);
      sky.addColorStop(0, '#6e8496');
      sky.addColorStop(0.45, '#241c1a');
      sky.addColorStop(0.72, '#160f0c');
      sky.addColorStop(1, '#040303');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 64, 32);

      // The fire, low and to one side, so the animal has a direction to be lit
      // from rather than an even wash.
      const fire = ctx.createRadialGradient(44, 26, 0, 44, 26, 26);
      fire.addColorStop(0, '#ff8a3d');
      fire.addColorStop(0.4, '#8a2a12');
      fire.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fire;
      ctx.fillRect(0, 0, 64, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envSource = paintEnvironment();
    const environment = pmrem.fromEquirectangular(envSource).texture;
    scene.environment = environment;
    envSource.dispose();
    pmrem.dispose();

    // The directional pair only shapes what the environment already lights: a
    // warm key where the fire is, a cold rim to pull the silhouette off black.
    const ambient = new THREE.AmbientLight(0x2a1e18, 0.5);
    const key = new THREE.DirectionalLight(0xffb877, 3.0);
    key.position.set(4, 3.5, 6);
    const rim = new THREE.DirectionalLight(PALETTE.steam, 4.6);
    rim.position.set(-5, 1.5, -4);
    scene.add(ambient, key, rim);

    /* ---- embers --------------------------------------------------------- */

    const emberCount = coarse ? 320 : 900;
    const emberGeometry = new THREE.BufferGeometry();
    const seeds = new Float32Array(emberCount * 3);
    const warm = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i += 1) {
      seeds[i * 3] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
      // Mostly cold vapour with a few live embers in it, the way the fire plate
      // in the film actually looks.
      warm[i] = Math.random() < 0.28 ? 0.55 + Math.random() * 0.45 : Math.random() * 0.2;
    }

    emberGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));
    emberGeometry.setAttribute('aWarm', new THREE.BufferAttribute(warm, 1));
    // Points still need a position attribute for the draw count even though the
    // shader ignores it.
    emberGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(emberCount * 3), 3),
    );

    const emberUniforms = {
      uTime: { value: 0 },
      uSize: { value: coarse ? 2.6 : 3.4 },
      uField: { value: 0 },
      uRise: { value: 0.035 },
      uOpacity: { value: 0.34 },
      uEmber: { value: ember },
      uSteam: { value: steam },
    };

    const embers = new THREE.Points(
      emberGeometry,
      new THREE.ShaderMaterial({
        vertexShader: emberVertex,
        fragmentShader: emberFragment,
        uniforms: emberUniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    embers.frustumCulled = false;
    scene.add(embers);

    /* ---- the dragon ------------------------------------------------------ */

    // rig carries scroll and pointer; fit holds the model centred and scaled,
    // so neither has to know what the other is doing.
    const rig = new THREE.Group();
    const fit = new THREE.Group();
    rig.add(fit);
    scene.add(rig);

    let mixer: THREE.AnimationMixer | null = null;
    let clipDuration = 0;
    let modelRadius = 1;
    const skins: THREE.Mesh[] = [];
    const hairMaterials: THREE.MeshStandardMaterial[] = [];
    const eyeMaterials: THREE.MeshStandardMaterial[] = [];
    let disposed = false;

    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      MODEL,
      (gltf) => {
        if (disposed) return;

        const root = gltf.scene;

        // The export sits thousands of units from the origin at its authored
        // scale, so it is centred and normalised once here rather than having
        // every later number carry the offset.
        const box = new THREE.Box3().setFromObject(root);
        const centre = box.getCenter(new THREE.Vector3());
        modelRadius = box.getSize(new THREE.Vector3()).length() / 2;
        root.position.sub(centre);
        fit.add(root);

        root.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;

          // Skinned geometry moves far outside the bounds three computed for
          // the bind pose, so leave the culling to the camera frustum alone.
          object.frustumCulled = false;
          skins.push(object);

          const material = object.material as THREE.MeshStandardMaterial;
          material.transparent = true;
          material.depthWrite = true;

          if (material.name.includes('eye')) {
            material.color = deep.clone();
            material.emissive = gold.clone();
            material.emissiveIntensity = 0.05;
            material.roughness = 0.42;
            eyeMaterials.push(material);
          } else {
            // The build leaves emissive at full white so the page can decide
            // what colour the animal burns.
            material.color = deep.clone();
            material.emissive = ember.clone();
            material.emissiveIntensity = 0.07;
            material.roughness = 0.42;
            material.metalness = 0.25;
            material.envMapIntensity = 1.6;
            hairMaterials.push(material);
          }
        });

        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(root);
          const clip = gltf.animations[0];
          clipDuration = clip.duration;
          mixer.clipAction(clip).play();
        }

        layout();
        apply();
        if (still) drawOnce();
      },
      undefined,
      () => {
        // The model did not arrive. The page is built to read without it.
      },
    );

    /* ---- layout ---------------------------------------------------------- */

    function layout() {
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      ({ worldW, worldH } = sizingFor(aspect));
      portrait = aspect < 1;

      emberUniforms.uField.value = worldH;

      // Fit the whole coil to a set fraction of the viewport height.
      const target = worldH * (portrait ? 0.58 : 1.45);
      fit.scale.setScalar(target / (modelRadius * 2));

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    layout();

    /* ---- drive ----------------------------------------------------------- */

    const lead = new THREE.Vector2(0, 0);
    const leadTarget = new THREE.Vector2(0, 0);
    let scroll = 0;
    let scrollTarget = 0;

    function readScroll() {
      const track = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = track > 0 ? Math.min(1, Math.max(0, window.scrollY / track)) : 0;
    }

    readScroll();
    scroll = scrollTarget;

    function onPointer(event: PointerEvent) {
      leadTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
    }

    function apply() {
      // The animal walks down the page as you read, and burns out at the end,
      // where the market has packed up and the page has gone to daylight.
      // A phone is a tall crop of the same animal, so it gets its own framing
      // rather than a scaled-down version of the wide one: brought back to the
      // centre, turned more front-on, and tilted so the body runs with the
      // diagonal of the screen instead of straight off both edges.
      rig.position.set(
        worldW * (portrait ? 0.0 : 0.36),
        worldH * ((portrait ? 0.26 : 0.05) - scroll * 0.55),
        -scroll * 9,
      );

      // Presented three-quarter on rather than side on, so the head reads.
      rig.rotation.set(
        (portrait ? -0.34 : -0.25) + lead.y * 0.16,
        (portrait ? -0.35 : -0.9) + lead.x * 0.34 + scroll * 0.5,
        portrait ? -0.42 : 0.06,
      );

      const dawn = THREE.MathUtils.smoothstep(scroll, 0.62, 0.96);

      // The dragon carries the opening frame, then stands back so the film's own
      // words can be read over it, then burns out at the end.
      // A solid model cannot sit behind prose the way a wash of light can, so it
      // drops much further than a glow would and keeps sinking away from the
      // camera as it goes.
      const recede = 1 - 0.86 * THREE.MathUtils.smoothstep(scroll, 0.02, 0.16);
      const fade =
        (1 - THREE.MathUtils.smoothstep(scroll, 0.9, 1)) *
        recede *
        (portrait ? 0.68 : 1);

      for (const material of hairMaterials) {
        material.emissive.copy(ember).lerp(steam, dawn);
        material.emissiveIntensity = 0.05 + dawn * 0.3;
        material.opacity = fade;
      }
      for (const material of eyeMaterials) {
        material.emissiveIntensity = 2.6 * (1 - dawn);
        material.opacity = fade;
      }

      key.intensity = 3.0 * (1 - dawn * 0.4);
      rim.intensity = 4.6 + dawn * 1.4;
      emberUniforms.uOpacity.value = 0.34 * fade;
    }

    /* ---- loop ------------------------------------------------------------ */

    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    let running = true;
    let still = motionQuery.matches;

    function draw(now: number) {
      frame = requestAnimationFrame(draw);
      if (!running) return;

      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      if (!still) {
        elapsed += dt;
        emberUniforms.uTime.value = elapsed;
        mixer?.update(dt);
        lead.lerp(leadTarget, damp(0.04, dt));
      }

      scroll += (scrollTarget - scroll) * damp(0.12, dt);
      apply();
      renderer.render(scene, camera);
    }

    // With motion reduced the animal is posed rather than swimming: one frame
    // from partway through the cycle, redrawn only on scroll or resize.
    function drawOnce() {
      emberUniforms.uTime.value = 3.2;
      if (mixer && clipDuration) mixer.setTime(clipDuration * 0.32);
      scroll = scrollTarget;
      apply();
      renderer.render(scene, camera);
    }

    function onScroll() {
      readScroll();
      if (still) drawOnce();
    }

    function onResize() {
      layout();
      readScroll();
      if (still) drawOnce();
    }

    function onVisibility() {
      running = !document.hidden;
      last = performance.now();
    }

    function onMotionChange() {
      still = motionQuery.matches;
      last = performance.now();
      if (still) drawOnce();
    }

    const canvas = renderer.domElement;
    function onContextLost(event: Event) {
      event.preventDefault();
      running = false;
    }

    if (still) {
      drawOnce();
    } else {
      frame = requestAnimationFrame(draw);
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    motionQuery.addEventListener('change', onMotionChange);
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery.removeEventListener('change', onMotionChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);

      mixer?.stopAllAction();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });

      environment.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="dragon-canvas" aria-hidden />;
}
