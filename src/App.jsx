import React, { useState, useRef } from 'react';
import EnterpriseHeader from './components/EnterpriseHeader';
import OverviewWorkspace from './components/OverviewWorkspace';
import City3DCanvas from './components/City3DCanvas';
import NodeDrawer from './components/NodeDrawer';
import DonorWorkspace from './components/DonorWorkspace';
import ShelterWorkspace from './components/ShelterWorkspace';
import LogisticsWorkspace from './components/LogisticsWorkspace';
import ESGComplianceWorkspace from './components/ESGComplianceWorkspace';
import AiForecastWorkspace from './components/AiForecastWorkspace';

// Modals
import RescueSimulatorModal from './components/RescueSimulatorModal';
import DonorPortalModal from './components/DonorPortalModal';
import ShelterPortalModal from './components/ShelterPortalModal';
import TaxCertificateModal from './components/TaxCertificateModal';

import { 
  ENTERPRISE_DONORS, ENTERPRISE_SHELTERS, ENTERPRISE_FLEET, 
  computeMatchScores, playChime 
} from './data/mockData';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | '3d-twin' | 'donor-hub' | 'shelter-hub' | 'logistics-vrp' | 'esg-audit' | 'ai-forecast'
  const [donors, setDonors] = useState(ENTERPRISE_DONORS);
  const [shelters, setShelters] = useState(ENTERPRISE_SHELTERS);
  const [fleet] = useState(ENTERPRISE_FLEET);
  const [totalRescuedKg, setTotalRescuedKg] = useState(245);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 3D Viewport Controls
  const [cameraPreset, setCameraPreset] = useState('OVERVIEW');
  const [timeOfDay, setTimeOfDay] = useState('NIGHT');

  // Active Mission & Simulation State
  const [activeMission, setActiveMission] = useState(null);
  const [missionProgress, setMissionProgress] = useState(0);
  const [simulationState, setSimulationState] = useState({
    isRunning: false,
    step: 'Idle',
    progress: 0,
    activeMission: null,
    winningMatch: null,
  });

  // Selected Node (for inspection on map or 3D)
  const [selectedNode, setSelectedNode] = useState(null);

  // Modals
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isDonorPortalOpen, setIsDonorPortalOpen] = useState(false);
  const [isShelterPortalOpen, setIsShelterPortalOpen] = useState(false);
  const [selectedDonorForCert, setSelectedDonorForCert] = useState(null);

  const missionIntervalRef = useRef(null);

  const triggerChime = (type) => {
    if (soundEnabled) playChime(type);
  };

  // Start Real-Time Mission Simulation
  const startSimulation = (donor, bestMatch) => {
    if (missionIntervalRef.current) {
      clearInterval(missionIntervalRef.current);
    }

    const mission = {
      donorId: donor.id,
      shelterId: bestMatch.shelterId,
      food: `${donor.foodItem} (${donor.quantityKg}kg)`,
      donorName: donor.name,
      shelterName: bestMatch.shelterName,
      quantityKg: donor.quantityKg,
    };

    setActiveMission(mission);
    setSimulationState({
      isRunning: true,
      step: 'Matching Algorithm Verified. Dispatching Eco Van...',
      progress: 0.05,
      activeMission: mission,
      winningMatch: bestMatch,
    });
    setMissionProgress(0.05);
    triggerChime('rescue_start');

    let currentProgress = 0.05;
    missionIntervalRef.current = setInterval(() => {
      currentProgress += 0.018;

      if (currentProgress < 0.3) {
        setSimulationState((prev) => ({
          ...prev,
          progress: currentProgress,
          step: `En route to ${donor.name} for cold-chain pickup...`,
        }));
      } else if (currentProgress < 0.55) {
        setSimulationState((prev) => ({
          ...prev,
          progress: currentProgress,
          step: `HACCP temperature verified (${donor.holdingTempC || 62}°C). Loaded!`,
        }));
      } else if (currentProgress < 0.95) {
        setSimulationState((prev) => ({
          ...prev,
          progress: currentProgress,
          step: `Navigating corridor to ${bestMatch.shelterName}...`,
        }));
      } else {
        // Complete
        clearInterval(missionIntervalRef.current);
        missionIntervalRef.current = null;
        currentProgress = 1;

        setSimulationState((prev) => ({
          ...prev,
          progress: 1,
          step: `Delivered! ${Math.round(donor.quantityKg * 2.5)} meals safely provided.`,
          isRunning: false,
        }));

        setTotalRescuedKg((prev) => prev + donor.quantityKg);

        // Update donor status & shelter need
        setDonors((prev) =>
          prev.map((d) => (d.id === donor.id ? { ...d, status: 'RESCUE_COMPLETED' } : d))
        );
        setShelters((prev) =>
          prev.map((s) =>
            s.id === bestMatch.shelterId
              ? { ...s, currentNeededMeals: Math.max(0, s.currentNeededMeals - Math.round(donor.quantityKg * 2.5)) }
              : s
          )
        );

        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.6 },
        });
        triggerChime('success');
      }

      setMissionProgress(currentProgress);
    }, 150);
  };

  const handleAddDonor = (newDonor) => {
    setDonors((prev) => [newDonor, ...prev]);
    setSelectedNode(newDonor);
    setActiveTab('overview');
    triggerChime('success');
  };

  const handleUpdateShelterNeed = (shelterId, neededMeals) => {
    setShelters((prev) =>
      prev.map((s) => (s.id === shelterId ? { ...s, currentNeededMeals: neededMeals } : s))
    );
  };

  const handleSelectDonorFromTable = (donor) => {
    const scores = computeMatchScores(donor, shelters);
    if (scores.length > 0) {
      startSimulation(donor, scores[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. Enterprise Top Navigation */}
      <EnterpriseHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        totalRescuedKg={totalRescuedKg}
      />

      {/* 2. Floating Mission In-Transit Banner (Visible on all tabs when van is moving) */}
      {simulationState.isRunning && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] animate-in slide-in-from-bottom duration-300">
          <div className="saas-card-glow px-5 py-4 rounded-2xl border border-emerald-500/60 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-xs uppercase tracking-wider text-white font-mono">
                  Autonomous Food Rescue Mission Active
                </span>
              </div>
              <span className="font-mono text-xs text-emerald-300 font-bold">
                {Math.round(simulationState.progress * 100)}%
              </span>
            </div>

            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-150"
                style={{ width: `${Math.round(simulationState.progress * 100)}%` }}
              />
            </div>

            <div className="text-xs text-slate-300 font-medium flex items-center justify-between">
              <span className="truncate">{simulationState.step}</span>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="text-[11px] text-emerald-400 hover:underline flex items-center gap-0.5 font-mono"
                >
                  2D Map <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setActiveTab('3d-twin')}
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5 font-mono"
                >
                  3D View <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Workspace View */}
      {activeTab === '3d-twin' ? (
        <div className="relative w-full h-[calc(100vh-84px)] overflow-hidden">
          <City3DCanvas
            donors={donors}
            shelters={shelters}
            activeMission={activeMission}
            selectedNode={selectedNode}
            onSelectNode={(node) => {
              setSelectedNode(node);
              setCameraPreset('FOCUS_DONOR');
            }}
            cameraPreset={cameraPreset}
            timeOfDay={timeOfDay}
            missionProgress={missionProgress}
            isSimulating={simulationState.isRunning}
          />

          {/* 3D Camera Controls */}
          <div className="absolute top-4 right-4 z-20 pointer-events-auto">
            <div className="glass-panel px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-xl flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setCameraPreset('OVERVIEW')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  cameraPreset === 'OVERVIEW' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Orbit 3D
              </button>
              <button
                onClick={() => setCameraPreset('FOLLOW_VAN')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  cameraPreset === 'FOLLOW_VAN' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Follow Van
              </button>
              <button
                onClick={() => setCameraPreset('TOP_DOWN')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  cameraPreset === 'TOP_DOWN' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                2D GIS
              </button>
            </div>
          </div>

          <NodeDrawer
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onDispatchFromNode={(node) => {
              setSelectedNode(null);
              setIsSimulatorOpen(true);
            }}
          />
        </div>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
          {activeTab === 'overview' && (
            <OverviewWorkspace
              donors={donors}
              shelters={shelters}
              fleet={fleet}
              activeMission={activeMission}
              missionProgress={missionProgress}
              selectedNode={selectedNode}
              onSelectNode={(node) => setSelectedNode(node)}
              onOpenSimulator={() => setIsSimulatorOpen(true)}
              onOpenDonorPortal={() => setIsDonorPortalOpen(true)}
              onOpenShelterPortal={() => setIsShelterPortalOpen(true)}
              totalRescuedKg={totalRescuedKg}
            />
          )}

          {activeTab === 'donor-hub' && (
            <DonorWorkspace
              donors={donors}
              onOpenNewBatchModal={() => setIsDonorPortalOpen(true)}
              onOpenCertificateModal={(donor) => setSelectedDonorForCert(donor)}
              onSelectDonorForRescue={handleSelectDonorFromTable}
            />
          )}

          {activeTab === 'shelter-hub' && (
            <ShelterWorkspace
              shelters={shelters}
              onUpdateShelterNeed={handleUpdateShelterNeed}
            />
          )}

          {activeTab === 'logistics-vrp' && (
            <LogisticsWorkspace
              onTriggerRescueMission={() => {
                const d1 = donors[0];
                const s1 = shelters[0];
                if (d1 && s1) {
                  startSimulation(d1, {
                    shelterId: s1.id,
                    shelterName: s1.name,
                    distanceKm: 2.1,
                  });
                }
              }}
              simulationState={simulationState}
            />
          )}

          {activeTab === 'esg-audit' && (
            <ESGComplianceWorkspace totalRescuedKg={totalRescuedKg} />
          )}

          {activeTab === 'ai-forecast' && (
            <AiForecastWorkspace />
          )}
        </main>
      )}

      {/* 4. Global Modals */}
      <RescueSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        donors={donors}
        shelters={shelters}
        onStartSimulation={startSimulation}
        simulationState={simulationState}
      />

      <DonorPortalModal
        isOpen={isDonorPortalOpen}
        onClose={() => setIsDonorPortalOpen(false)}
        onAddDonor={handleAddDonor}
      />

      <ShelterPortalModal
        isOpen={isShelterPortalOpen}
        onClose={() => setIsShelterPortalOpen(false)}
        shelters={shelters}
        onUpdateShelterNeed={handleUpdateShelterNeed}
      />

      <TaxCertificateModal
        isOpen={Boolean(selectedDonorForCert)}
        onClose={() => setSelectedDonorForCert(null)}
        donor={selectedDonorForCert}
      />

      {/* Footer */}
      {activeTab !== '3d-twin' && (
        <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500 font-mono">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
            <span>Surplus-to-Shelter PRO • AmiHacks Problem Statement 1</span>
            <span>Aligned with UN SDG 2 (Zero Hunger) & SDG 12.3 (Halve Food Waste)</span>
          </div>
        </footer>
      )}
    </div>
  );
}
