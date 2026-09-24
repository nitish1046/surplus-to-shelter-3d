import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function City3DCanvas({
  donors = [],
  shelters = [],
  activeMission = null,
  selectedNode = null,
  onSelectNode = () => {},
  cameraPreset = 'OVERVIEW',
  timeOfDay = 'NIGHT',
  missionProgress = 0, // 0 to 1
  isSimulating = false
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const vanMeshRef = useRef(null);
  const routeLineRef = useRef(null);
  const animatedObjectsRef = useRef([]);
  const interactiveMeshesRef = useRef([]);
  const arcSplineRef = useRef(null);
  const headLightsRef = useRef([]);

  // Tooltip hover state
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Fog for depth
    const fogColor = timeOfDay === 'NIGHT' ? 0x070b14 : timeOfDay === 'SUNSET' ? 0x271924 : 0x87ceeb;
    scene.fog = new THREE.FogExp2(fogColor, 0.012);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 55, 65);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
    controls.minDistance = 15;
    controls.maxDistance = 150;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(
      timeOfDay === 'NIGHT' ? 0x1e293b : timeOfDay === 'SUNSET' ? 0xfdba74 : 0xffffff,
      timeOfDay === 'NIGHT' ? 1.2 : 1.8
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      timeOfDay === 'NIGHT' ? 0x38bdf8 : timeOfDay === 'SUNSET' ? 0xf97316 : 0xfffbeb,
      timeOfDay === 'NIGHT' ? 1.4 : 2.2
    );
    dirLight.position.set(40, 70, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 180;
    dirLight.shadow.camera.left = -60;
    dirLight.shadow.camera.right = 60;
    dirLight.shadow.camera.top = 60;
    dirLight.shadow.camera.bottom = -60;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Subtle blue under-glow for cyberpunk city grid
    const hemiLight = new THREE.HemisphereLight(0x0f172a, 0x020617, 0.8);
    scene.add(hemiLight);

    // 4. Ground & Road Network
    createCityGroundAndRoads(scene);

    // 5. Procedural City Buildings
    createProceduralBuildings(scene, interactiveMeshesRef);

    // 6. 3D Rescue Delivery Van
    const vanGroup = createVanMesh();
    scene.add(vanGroup);
    vanMeshRef.current = vanGroup;

    // 7. Raycasting for hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && !root.userData?.nodeData && root.parent !== scene) {
          root = root.parent;
        }
        if (root.userData?.nodeData) {
          setHoveredNode(root.userData.nodeData);
          setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          container.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredNode(null);
      container.style.cursor = 'grab';
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && !root.userData?.nodeData && root.parent !== scene) {
          root = root.parent;
        }
        if (root.userData?.nodeData) {
          onSelectNode(root.userData.nodeData);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update Orbit controls
      controls.update();

      // Animate beacons & markers
      animatedObjectsRef.current.forEach((obj) => {
        if (obj.userData?.type === 'beacon') {
          obj.rotation.y += delta * 1.5;
          obj.position.y = obj.userData.baseY + Math.sin(elapsed * 2.5 + obj.userData.offset) * 0.4;
        }
        if (obj.userData?.type === 'ring') {
          obj.rotation.z += delta * 0.8;
          const s = 1 + Math.sin(elapsed * 3) * 0.12;
          obj.scale.set(s, s, s);
        }
        if (obj.userData?.type === 'pulsePillar') {
          obj.material.opacity = 0.35 + Math.sin(elapsed * 4) * 0.25;
        }
      });

      // Animate Route Dashes if active
      if (routeLineRef.current && routeLineRef.current.material.dashOffset !== undefined) {
        routeLineRef.current.material.dashOffset -= delta * 12;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [timeOfDay]);

  // Update Dynamic Markers when donors or shelters change
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove old markers
    const toRemove = [];
    scene.traverse((child) => {
      if (child.userData?.isDynamicNode) toRemove.push(child);
    });
    toRemove.forEach((c) => scene.remove(c));

    // Clear dynamic interactive meshes
    interactiveMeshesRef.current = interactiveMeshesRef.current.filter((m) => !m.userData?.isDynamicNode);
    animatedObjectsRef.current = animatedObjectsRef.current.filter((m) => !m.userData?.isDynamicNode);

    // Create Donor 3D Landmarks
    donors.forEach((donor) => {
      const donorGroup = createDonorLandmark(donor);
      scene.add(donorGroup);
      interactiveMeshesRef.current.push(donorGroup);
    });

    // Create Shelter 3D Landmarks
    shelters.forEach((shelter) => {
      const shelterGroup = createShelterLandmark(shelter);
      scene.add(shelterGroup);
      interactiveMeshesRef.current.push(shelterGroup);
    });
  }, [donors, shelters]);

  // Update 3D Spline Arc Route & Van Position during mission
  useEffect(() => {
    const scene = sceneRef.current;
    const van = vanMeshRef.current;
    if (!scene || !van) return;

    // Clean old route line
    if (routeLineRef.current) {
      scene.remove(routeLineRef.current);
      routeLineRef.current.geometry.dispose();
      routeLineRef.current.material.dispose();
      routeLineRef.current = null;
    }

    if (!activeMission) {
      van.visible = false;
      return;
    }

    van.visible = true;

    // Find donor and shelter coords
    const donor = donors.find((d) => d.id === activeMission.donorId);
    const shelter = shelters.find((s) => s.id === activeMission.shelterId);

    if (!donor || !shelter) return;

    const start = new THREE.Vector3(donor.position[0], 0.2, donor.position[2]);
    const end = new THREE.Vector3(shelter.position[0], 0.2, shelter.position[2]);

    // Elevated smooth parabolic 3D flight / route arc
    const midPoint = new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(6, Math.hypot(start.x - end.x, start.z - end.z) * 0.25),
      (start.z + end.z) / 2
    );

    const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
    arcSplineRef.current = curve;

    // Arc Line (Glowing laser route in sky)
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
      color: 0x22c55e,
      linewidth: 3,
      scale: 1,
      dashSize: 1.5,
      gapSize: 0.8,
    });
    const arcLine = new THREE.Line(geometry, material);
    arcLine.computeLineDistances();
    scene.add(arcLine);
    routeLineRef.current = arcLine;

    // Animate van position along ground path (or smooth curve)
    // To keep it on roads, we interpolate position with slight curve
    const t = Math.max(0, Math.min(1, missionProgress));
    
    // Position on curve
    const currentPoint = curve.getPoint(t);
    // Keep van on ground level for realism
    van.position.set(currentPoint.x, 0.4, currentPoint.z);

    // Make van face travel direction
    const tangent = curve.getTangent(t).normalize();
    const lookAtPos = new THREE.Vector3(currentPoint.x + tangent.x, 0.4, currentPoint.z + tangent.z);
    van.lookAt(lookAtPos);

    // Spin wheels
    const wheels = van.userData?.wheels;
    if (wheels) {
      wheels.forEach((w) => (w.rotation.x += 0.2));
    }
  }, [activeMission, missionProgress, donors, shelters]);

  // Camera Presets
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (cameraPreset === 'OVERVIEW') {
      smoothCameraMove(camera, controls, new THREE.Vector3(0, 52, 62), new THREE.Vector3(0, 0, 0));
    } else if (cameraPreset === 'FOLLOW_VAN' && vanMeshRef.current && activeMission) {
      const vp = vanMeshRef.current.position;
      smoothCameraMove(camera, controls, new THREE.Vector3(vp.x + 15, 20, vp.z + 18), new THREE.Vector3(vp.x, 0, vp.z));
    } else if (cameraPreset === 'TOP_DOWN') {
      smoothCameraMove(camera, controls, new THREE.Vector3(0, 85, 0.1), new THREE.Vector3(0, 0, 0));
    } else if (cameraPreset === 'FOCUS_DONOR' && selectedNode) {
      const [nx, , nz] = selectedNode.position;
      smoothCameraMove(camera, controls, new THREE.Vector3(nx + 14, 16, nz + 16), new THREE.Vector3(nx, 2, nz));
    }
  }, [cameraPreset, selectedNode, activeMission]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive 3D Node Hover Tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-75"
          style={{ left: tooltipPos.x, top: tooltipPos.y - 12 }}
        >
          <div className="glass-panel-glow px-3 py-2 rounded-xl border border-emerald-500/40 text-xs shadow-2xl backdrop-blur-md min-w-[200px]">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                hoveredNode.tag === 'RESTAURANT' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                hoveredNode.tag === 'BANQUET' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                hoveredNode.tag === 'BAKERY' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {hoveredNode.tag || 'SHELTER'}
              </span>
              {hoveredNode.safeHoursRemaining && (
                <span className="text-red-400 font-mono font-semibold text-[10px]">
                  ⏱ {hoveredNode.safeHoursRemaining}h left
                </span>
              )}
            </div>
            <div className="font-bold text-slate-100 text-sm truncate">{hoveredNode.name}</div>
            <div className="text-slate-400 text-[11px] truncate">{hoveredNode.locationName}</div>

            <div className="mt-2 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
              {hoveredNode.quantityKg ? (
                <>
                  <span className="text-slate-400">Surplus:</span>
                  <span className="text-emerald-400 font-bold font-mono">{hoveredNode.quantityKg} kg ({hoveredNode.mealsEquivalent} meals)</span>
                </>
              ) : (
                <>
                  <span className="text-slate-400">Need Capacity:</span>
                  <span className="text-cyan-400 font-bold font-mono">{hoveredNode.currentNeededMeals} meals</span>
                </>
              )}
            </div>
            <div className="mt-1 text-[10px] text-center text-slate-500 italic">Click building to view full details</div>
          </div>
        </div>
      )}

      {/* 3D Scene Controls HUD (Bottom Left overlay) */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="glass-panel px-3 py-2 rounded-xl flex items-center gap-3 border border-slate-700/50 shadow-lg text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono font-medium text-[11px]">3D Digital Twin City</span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Donors ({donors.length})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> Shelters ({shelters.length})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span> Eco Vans (2)
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper Functions inside component closure
  function createCityGroundAndRoads(scene) {
    // Main asphalt ground
    const groundGeo = new THREE.PlaneGeometry(240, 240);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x070c18,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // City Grid Lines (Cyber roads)
    const gridHelper = new THREE.GridHelper(220, 44, 0x1e293b, 0x0f172a);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // Main Avenue Roads (Asphalt strips with neon divider lines)
    const mainAvenues = [
      { x: 0, z: 0, w: 220, h: 5.5, rot: 0 },
      { x: 0, z: 0, w: 5.5, h: 220, rot: 0 },
      { x: -30, z: 0, w: 4, h: 220, rot: 0 },
      { x: 30, z: 0, w: 4, h: 220, rot: 0 },
      { x: 0, z: -25, w: 220, h: 4, rot: 0 },
      { x: 0, z: 25, w: 220, h: 4, rot: 0 },
    ];

    mainAvenues.forEach((ave) => {
      const roadGeo = new THREE.PlaneGeometry(ave.w, ave.h);
      const roadMat = new THREE.MeshStandardMaterial({
        color: 0x0b1329,
        roughness: 0.7,
        metalness: 0.2,
      });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(ave.x, 0.08, ave.z);
      road.receiveShadow = true;
      scene.add(road);
    });
  }

  function createProceduralBuildings(scene, interactiveList) {
    // Generate background stylized buildings around the city
    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
    
    // Deterministic procedural generation
    const blocks = [];
    for (let x = -80; x <= 80; x += 16) {
      for (let z = -80; z <= 80; z += 16) {
        // Skip central roads
        if (Math.abs(x) < 8 || Math.abs(z) < 8 || Math.abs(x + 30) < 6 || Math.abs(x - 30) < 6 || Math.abs(z + 25) < 6 || Math.abs(z - 25) < 6) {
          continue;
        }

        // Avoid landmark positions
        const nearLandmark = [...donors, ...shelters].some((item) => {
          return Math.hypot(item.position[0] - x, item.position[2] - z) < 10;
        });

        if (nearLandmark) continue;

        // Pseudo-random height
        const seed = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
        const rand = seed - Math.floor(seed);
        const height = 6 + rand * 22;
        const width = 8 + (rand > 0.5 ? 2 : -1.5);
        const depth = 8 + (rand > 0.3 ? 2 : -1.5);

        // Building colors: sleek modern corporate blues, dark slates
        const colorPalette = [0x0f172a, 0x111e38, 0x1e293b, 0x0c1b33];
        const col = colorPalette[Math.floor(rand * colorPalette.length)];

        const mat = new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.3,
          metalness: 0.6,
        });

        const building = new THREE.Mesh(buildingGeo, mat);
        building.scale.set(width, height, depth);
        building.position.set(x + (rand - 0.5) * 2, height / 2, z + (rand - 0.5) * 2);
        building.castShadow = true;
        building.receiveShadow = true;
        scene.add(building);

        // Add lit window strips on select buildings
        if (rand > 0.4) {
          const windowGeo = new THREE.BoxGeometry(width * 1.01, 0.4, depth * 1.01);
          const windowMat = new THREE.MeshBasicMaterial({
            color: rand > 0.7 ? 0x38bdf8 : 0xfde047,
          });
          const windowStrip = new THREE.Mesh(windowGeo, windowMat);
          windowStrip.position.set(building.position.x, height * 0.75, building.position.z);
          scene.add(windowStrip);
        }
      }
    }
  }

  function createDonorLandmark(donor) {
    const group = new THREE.Group();
    group.position.set(donor.position[0], 0, donor.position[2]);
    group.userData = { nodeData: donor, isDynamicNode: true };

    // Building Base
    const width = 8;
    const height = 12;
    const depth = 8;

    const baseGeo = new THREE.BoxGeometry(width, height, depth);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e2f,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x221100,
      emissiveIntensity: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = height / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // Rooftop Terrace & Glowing Signboard
    const roofGeo = new THREE.BoxGeometry(width + 0.6, 1, depth + 0.6);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.y = height + 0.5;
    group.add(roofMesh);

    // Floating 3D Diamond Beacon
    const beaconGeo = new THREE.OctahedronGeometry(1.6, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: donor.urgency === 'CRITICAL' ? 0xef4444 : donor.urgency === 'HIGH' ? 0xf97316 : 0x10b981,
      emissive: donor.urgency === 'CRITICAL' ? 0xef4444 : donor.urgency === 'HIGH' ? 0xf97316 : 0x10b981,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = height + 5;
    beaconMesh.userData = { type: 'beacon', baseY: height + 5, offset: Math.random() * 5 };
    group.add(beaconMesh);
    animatedObjectsRef.current.push(beaconMesh);

    // Pulsing Ground Radar Ring
    const ringGeo = new THREE.RingGeometry(5.5, 6.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.12;
    ringMesh.userData = { type: 'ring' };
    group.add(ringMesh);
    animatedObjectsRef.current.push(ringMesh);

    // Vertical Light Beam
    const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 16, 16);
    const pillarMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.y = height + 8;
    pillar.userData = { type: 'pulsePillar' };
    group.add(pillar);
    animatedObjectsRef.current.push(pillar);

    return group;
  }

  function createShelterLandmark(shelter) {
    const group = new THREE.Group();
    group.position.set(shelter.position[0], 0, shelter.position[2]);
    group.userData = { nodeData: shelter, isDynamicNode: true };

    // Building Base - Distinct cylindrical or multi-wing sanctuary complex
    const height = 9;
    const radius = 5;

    const baseGeo = new THREE.CylinderGeometry(radius, radius * 1.2, height, 16);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f2744,
      roughness: 0.3,
      metalness: 0.6,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.2,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = height / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // Glowing Geodesic Dome / Canopy on roof
    const domeGeo = new THREE.SphereGeometry(radius * 0.9, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      wireframe: true,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.y = height;
    group.add(domeMesh);

    // Floating Holographic Capacity Ring
    const capRingGeo = new THREE.TorusGeometry(2.5, 0.25, 16, 32);
    const capRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.0,
      metalness: 0.5,
    });
    const capRingMesh = new THREE.Mesh(capRingGeo, capRingMat);
    capRingMesh.position.y = height + 4.5;
    capRingMesh.rotation.x = Math.PI / 2;
    capRingMesh.userData = { type: 'beacon', baseY: height + 4.5, offset: Math.random() * 5 };
    group.add(capRingMesh);
    animatedObjectsRef.current.push(capRingMesh);

    // Ground Sanctuary Ring
    const gRingGeo = new THREE.RingGeometry(6.5, 7.2, 32);
    const gRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const gRingMesh = new THREE.Mesh(gRingGeo, gRingMat);
    gRingMesh.rotation.x = -Math.PI / 2;
    gRingMesh.position.y = 0.12;
    gRingMesh.userData = { type: 'ring' };
    group.add(gRingMesh);
    animatedObjectsRef.current.push(gRingMesh);

    return group;
  }

  function createVanMesh() {
    const vanGroup = new THREE.Group();
    vanGroup.visible = false;

    // Van Body (Sleek Eco Delivery Van)
    const bodyGeo = new THREE.BoxGeometry(2.4, 1.6, 4.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald green
      roughness: 0.2,
      metalness: 0.7,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.1;
    body.castShadow = true;
    vanGroup.add(body);

    // Roof Top Carrier (White)
    const roofGeo = new THREE.BoxGeometry(2.2, 0.4, 3.8);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 2.0;
    vanGroup.add(roof);

    // Windshield (Cyber Cyan glass)
    const glassGeo = new THREE.BoxGeometry(2.2, 0.7, 1.2);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, 1.3, 1.55);
    vanGroup.add(glass);

    // Headlight Spotlights
    const lightColor = 0xfef08a;
    const hlGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const hlMat = new THREE.MeshBasicMaterial({ color: lightColor });

    const hlLeft = new THREE.Mesh(hlGeo, hlMat);
    hlLeft.position.set(-0.85, 0.8, 2.15);
    vanGroup.add(hlLeft);

    const hlRight = new THREE.Mesh(hlGeo, hlMat);
    hlRight.position.set(0.85, 0.8, 2.15);
    vanGroup.add(hlRight);

    // Twin Spotlights casting beams onto road
    const spotLeft = new THREE.SpotLight(lightColor, 4, 15, Math.PI / 6, 0.4);
    spotLeft.position.set(-0.85, 0.8, 2.15);
    spotLeft.target.position.set(-0.85, 0, 8);
    vanGroup.add(spotLeft);
    vanGroup.add(spotLeft.target);

    // 4 Wheels
    const wheels = [];
    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });

    const wheelPositions = [
      [-1.25, 0.45, 1.3],
      [1.25, 0.45, 1.3],
      [-1.25, 0.45, -1.3],
      [1.25, 0.45, -1.3],
    ];

    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      vanGroup.add(wheel);
      wheels.push(wheel);
    });

    vanGroup.userData = { wheels };
    return vanGroup;
  }

  function smoothCameraMove(camera, controls, targetPos, targetLookAt) {
    const startPos = camera.position.clone();
    const startLookAt = controls.target.clone();
    let startTime = performance.now();
    const duration = 1000;

    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2; // Smooth cosine ease

      camera.position.lerpVectors(startPos, targetPos, ease);
      controls.target.lerpVectors(startLookAt, targetLookAt, ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }
}
