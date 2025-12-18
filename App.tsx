
import React, { useState } from 'react';
import { GLOBAL_STATS } from './constants';
import { StatCard } from './components/StatCard';
import { Users, UserCheck, UserX, AlertCircle, Shield, LayoutDashboard, FileWarning, TrendingDown, HelpCircle } from 'lucide-react';
import AvailabilityChart from './components/AvailabilityChart';
import RankChart from './components/RankChart';
import OPMSTable from './components/OPMSTable';
import ReasonsView from './components/ReasonsView';
import TopUnavailableView from './components/TopUnavailableView';
import OPMDetailsView from './components/OPMDetailsView';
import ReasonDetailsView from './components/ReasonDetailsView';
import OthersBreakdownView from './components/OthersBreakdownView';
import ObservationDetailsView from './components/ObservationDetailsView';
import OPMReasonPersonnelView from './components/OPMReasonPersonnelView';

type Tab = 'dashboard' | 'reasons' | 'top-unavailable' | 'opm-details' | 'reason-details' | 'others' | 'observation-details' | 'opm-reason-personnel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedOPM, setSelectedOPM] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedObservation, setSelectedObservation] = useState<string | null>(null);
  
  const percentageAvailable = ((GLOBAL_STATS.available + GLOBAL_STATS.availableSpecial) / GLOBAL_STATS.total * 100).toFixed(1);

  const handleSelectOPM = (opmName: string) => {
    setSelectedOPM(opmName);
    setActiveTab('opm-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectReason = (reasonName: string) => {
    setSelectedReason(reasonName);
    setActiveTab('reason-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOPMReason = (opmName: string, reasonName: string) => {
    setSelectedOPM(opmName);
    setSelectedReason(reasonName);
    setActiveTab('opm-reason-personnel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectObservation = (obsName: string) => {
    setSelectedObservation(obsName);
    setActiveTab('observation-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTopUnavailable = () => {
    setSelectedOPM(null);
    setActiveTab('top-unavailable');
  };

  const handleBackToOPMDetails = () => {
    setActiveTab('opm-details');
  };

  const handleBackToReasons = () => {
    setSelectedReason(null);
    setActiveTab('reasons');
  };

  const handleBackToOthers = () => {
    setSelectedObservation(null);
    setActiveTab('others');
  };

  return (
    <div className="min-h-screen bg-white pb-10 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
               <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter italic">Efetivo<span className="text-blue-700">Pro</span></h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-80">Monitoramento de Prontidão</p>
            </div>
          </div>
          
          {/* Tab Navigation - Intensificada */}
          <nav className="flex space-x-2 bg-slate-200 p-1.5 rounded-2xl overflow-x-auto shadow-inner">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-3 text-[13px] font-black uppercase tracking-tight rounded-xl transition-all whitespace-nowrap border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'bg-white text-blue-800 shadow-lg border-blue-600' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300 border-transparent'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 stroke-[3px]" />
              Geral
            </button>
            <button
              onClick={() => setActiveTab('top-unavailable')}
              className={`flex items-center gap-2 px-6 py-3 text-[13px] font-black uppercase tracking-tight rounded-xl transition-all whitespace-nowrap border-b-2 ${
                ['top-unavailable', 'opm-details', 'opm-reason-personnel'].includes(activeTab)
                  ? 'bg-white text-blue-800 shadow-lg border-blue-600' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300 border-transparent'
              }`}
            >
              <TrendingDown className="w-4 h-4 stroke-[3px]" />
              Unidades
            </button>
            <button
              onClick={() => setActiveTab('reasons')}
              className={`flex items-center gap-2 px-6 py-3 text-[13px] font-black uppercase tracking-tight rounded-xl transition-all whitespace-nowrap border-b-2 ${
                ['reasons', 'reason-details'].includes(activeTab)
                  ? 'bg-white text-blue-800 shadow-lg border-blue-600' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300 border-transparent'
              }`}
            >
              <FileWarning className="w-4 h-4 stroke-[3px]" />
              Motivos
            </button>
            <button
              onClick={() => setActiveTab('others')}
              className={`flex items-center gap-2 px-6 py-3 text-[13px] font-black uppercase tracking-tight rounded-xl transition-all whitespace-nowrap border-b-2 ${
                ['others', 'observation-details'].includes(activeTab)
                  ? 'bg-red-700 text-white shadow-xl shadow-red-200 border-red-900' 
                  : 'text-slate-600 hover:text-red-800 hover:bg-red-50 border-transparent'
              }`}
            >
              <HelpCircle className="w-4 h-4 stroke-[3px]" />
              Outros
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Efetivo Total" 
            value={GLOBAL_STATS.total} 
            icon={Users} 
            color="indigo" 
          />
          <StatCard 
            title="Disponíveis" 
            value={GLOBAL_STATS.available} 
            icon={UserCheck} 
            color="green" 
            subtext={`${percentageAvailable}% disponível`}
          />
          <StatCard 
            title="Filho Especial" 
            value={GLOBAL_STATS.availableSpecial} 
            icon={AlertCircle} 
            color="blue" 
            subtext="Regime diferenciado"
          />
          <StatCard 
            title="Indisponíveis" 
            value={GLOBAL_STATS.unavailable} 
            icon={UserX} 
            color="red" 
          />
        </div>

        {/* Content Area */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-blue-200 transition-colors group">
                <h3 className="font-black text-slate-800 mb-4 text-center uppercase text-xs tracking-widest border-b border-slate-100 pb-2 group-hover:text-blue-600 transition-colors">Condição do Efetivo</h3>
                <div className="flex-1 flex items-center justify-center">
                  <AvailabilityChart />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:col-span-2 hover:border-blue-200 transition-colors group">
                <h3 className="font-black text-slate-800 mb-4 uppercase text-xs tracking-widest border-b border-slate-100 pb-2 group-hover:text-blue-600 transition-colors">Distribuição por Quadro (Oficiais vs Praças)</h3>
                <div className="flex-1">
                  <RankChart />
                </div>
              </div>
            </div>

            <div className="w-full">
               <OPMSTable onSelectOPM={handleSelectOPM} />
            </div>
          </div>
        )}

        {activeTab === 'top-unavailable' && (
          <TopUnavailableView onSelectOPM={handleSelectOPM} onSelectReason={handleSelectReason} />
        )}

        {activeTab === 'opm-details' && selectedOPM && (
          <OPMDetailsView 
            opmName={selectedOPM} 
            onBack={handleBackToTopUnavailable} 
            onSelectReason={(reason) => handleSelectOPMReason(selectedOPM, reason)}
          />
        )}

        {activeTab === 'opm-reason-personnel' && selectedOPM && selectedReason && (
          <OPMReasonPersonnelView 
            opmName={selectedOPM} 
            reasonName={selectedReason} 
            onBack={handleBackToOPMDetails} 
          />
        )}

        {activeTab === 'reasons' && (
          <ReasonsView onSelectReason={handleSelectReason} />
        )}

        {activeTab === 'reason-details' && selectedReason && (
          <ReasonDetailsView reasonName={selectedReason} onBack={handleBackToReasons} />
        )}

        {activeTab === 'others' && (
          <OthersBreakdownView onSelectObservation={handleSelectObservation} />
        )}

        {activeTab === 'observation-details' && selectedObservation && (
          <ObservationDetailsView observationName={selectedObservation} onBack={handleBackToOthers} />
        )}
      </main>
    </div>
  );
};

export default App;