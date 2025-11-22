"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

gsap.registerPlugin(ScrollTrigger);

// Types for Three.js refs
interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
  locations: number[];
}

export const HorizonHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 3;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100,
    locations: []
  });

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const createStarField = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;

      const starCount = 5000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;

      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;

      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100;
          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;

      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const getLocation = () => {
      const refs = threeRefs.current;
      const locations: number[] = [];
      refs.mountains.forEach((mountain, i) => {
        locations[i] = mountain.position.z;
      });
      refs.locations = locations;
    };

    const animate = () => {
      const refs = threeRefs.current;
      refs.animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material instanceof THREE.ShaderMaterial) {
          starField.material.uniforms.time.value = time;
        }
      });

      // Update nebula
      if (refs.nebula && refs.nebula.material instanceof THREE.ShaderMaterial) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      // Smooth camera movement
      if (refs.camera) {
        const smoothingFactor = 0.05;

        smoothCameraPos.current.x +=
          (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y +=
          (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z +=
          (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax mountains
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor;
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    const initThree = () => {
      const refs = threeRefs.current;

      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.set(0, 20, 100);

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();

      setIsReady(true);
    };

    initThree();

    const handleResize = () => {
      const refs = threeRefs.current;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      const refs = threeRefs.current;
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }
      window.removeEventListener("resize", handleResize);

      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        if (Array.isArray(starField.material)) {
          starField.material.forEach((m) => m.dispose());
        } else {
          starField.material.dispose();
        }
      });

      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose();
        if (Array.isArray(mountain.material)) {
          mountain.material.forEach((m) => m.dispose());
        } else {
          mountain.material.dispose();
        }
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        if (Array.isArray(refs.nebula.material)) {
          refs.nebula.material.forEach((m) => m.dispose());
        } else {
          refs.nebula.material.dispose();
        }
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isReady) return;

    gsap.set(
      [
        menuRef.current,
        titleRef.current,
        subtitleRef.current,
        scrollProgressRef.current,
      ],
      {
        visibility: "visible",
      }
    );

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (titleRef.current) {
       tl.from(titleRef.current, {
          y: 200,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
       }, "-=0.5");
    }

    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        subtitleLines,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }

    if (scrollProgressRef.current) {
      tl.from(
        scrollProgressRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(documentHeight - windowHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(Math.min(newSection, totalSections - 1));

      const refs = threeRefs.current;

      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;

      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
        { x: 0, y: 60, z: -1200 },
      ];

      const currentPos = cameraPositions[Math.min(newSection, cameraPositions.length - 1)];
      const nextPos = cameraPositions[Math.min(newSection + 1, cameraPositions.length - 1)];

      if (currentPos && nextPos) {
        refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
        refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
        refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      }

      if (refs.mountains.length > 0 && refs.nebula) {
         refs.mountains.forEach((mountain, i) => {
            const speed = 1 + i * 0.9;
            // const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
            
            if (progress > 0.7) {
                mountain.position.z = 600000;
            } else {
                if(refs.locations[i] !== undefined) {
                     mountain.position.z = refs.locations[i];
                }
            }
         });
         
         refs.nebula.position.z = -1050 + scrollY * 0.5;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSections]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      <div
        ref={menuRef}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4 mix-blend-difference"
        style={{ visibility: "hidden" }}
      >
        <div className="flex flex-col gap-2">
          <span className="w-1 h-1 bg-white rounded-full"></span>
          <span className="w-1 h-8 bg-white rounded-full"></span>
          <span className="w-1 h-1 bg-white rounded-full"></span>
        </div>
        <div className="rotate-180 text-white/50 text-xs font-mono tracking-widest" style={{ writingMode: "vertical-rl" }}>
          SPACE
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center pointer-events-none">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/10"
        >
          HORIZON
        </h1>

        <div
          ref={subtitleRef}
          className="mt-8 space-y-2 text-lg md:text-xl font-light tracking-wide text-blue-200/80"
        >
          <p className="subtitle-line">Where vision meets reality,</p>
          <p className="subtitle-line">we shape the future of tomorrow</p>
        </div>
      </div>

      <div
        ref={scrollProgressRef}
        className="fixed right-8 bottom-8 z-20 flex items-center gap-4 text-white/50 font-mono text-xs mix-blend-difference"
        style={{ visibility: "hidden" }}
      >
        <span className="hidden md:inline">SCROLL</span>
        <div className="w-24 h-px bg-white/20 relative">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span>
          {String(currentSection + 1).padStart(2, "0")} /{" "}
          {String(totalSections).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10">
        <section className="h-screen w-full snap-start" />

        <section className="h-screen w-full flex items-center justify-center snap-start pointer-events-none">
             <div className="text-center">
                <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-b from-pink-200 to-pink-500/10 tracking-tighter opacity-0 animate-fade-in-up transition-opacity duration-1000"
                    style={{ opacity: currentSection === 1 ? 1 : 0 }}
                >
                    COSMOS
                </h2>
                <p className="mt-6 text-lg text-pink-200/60 max-w-md mx-auto transition-opacity duration-1000"
                   style={{ opacity: currentSection === 1 ? 1 : 0 }}
                >
                    Beyond the boundaries of imagination,<br/>lies the universe of possibilities
                </p>
             </div>
        </section>

        <section className="h-screen w-full flex items-center justify-center snap-start pointer-events-none">
             <div className="text-center">
                <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-b from-cyan-200 to-cyan-500/10 tracking-tighter transition-opacity duration-1000"
                     style={{ opacity: currentSection === 2 ? 1 : 0 }}
                >
                    INFINITY
                </h2>
                 <p className="mt-6 text-lg text-cyan-200/60 max-w-md mx-auto transition-opacity duration-1000"
                   style={{ opacity: currentSection === 2 ? 1 : 0 }}
                >
                    In the space between thought and creation,<br/>we find the essence of true innovation
                </p>
             </div>
        </section>
      </div>
    </div>
  );
};
