
import React, { useState } from 'react';
import { GLOBAL_STATS } from './constants';
import { StatCard } from './components/StatCard';
import { Users, UserCheck, UserX, AlertCircle, Shield, LayoutDashboard, FileWarning, TrendingDown, HelpCircle, Map } from 'lucide-react';
import AvailabilityChart from './components/AvailabilityChart';
import RankChart from './components/RankChart';
import OPMSTable from './components/OPMSTable';
import ReasonsView from './components/ReasonsView';
import TopUnavailableView from './components/TopUnavailableView';
import OPMDetailsView from './components/OPMDetailsView';
import ReasonDetailsView from './components/ReasonDetailsView';
import OthersBreakdownView from './components/OthersBreakdownView';
import ObservationDetailsView from './components/ObservationDetailsView';

type Tab = 'dashboard' | 'reasons' | 'top-unavailable' | 'opm-details' | 'reason-details' | 'others' | 'observation-details';

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

  const handleSelectObservation = (obsName: string) => {
    setSelectedObservation(obsName);
    setActiveTab('observation-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTopUnavailable = () => {
    setSelectedOPM(null);
    setActiveTab('top-unavailable');
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
    <div className="min-h-screen bg-white pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
               <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Painel de Controle</h1>
              <p className="text-xs text-slate-500 font-medium">Gestão de Efetivo Operacional</p>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === 'dashboard' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Geral
            </button>
            <button
              onClick={() => setActiveTab('top-unavailable')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === 'top-unavailable' || activeTab === 'opm-details'
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Indisponíveis
            </button>
            <button
              onClick={() => setActiveTab('reasons')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === 'reasons' || activeTab === 'reason-details'
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileWarning className="w-4 h-4" />
              Motivos
            </button>
            <button
              onClick={() => setActiveTab('others')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === 'others' || activeTab === 'observation-details'
                  ? 'bg-white text-red-700 shadow-sm border border-red-100' 
                  : 'text-slate-500 hover:text-red-700 hover:bg-red-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Motivo Outros
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
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="font-bold text-slate-800 mb-4 text-center uppercase text-xs tracking-widest border-b border-slate-100 pb-2">Condição do Efetivo</h3>
                <div className="flex-1 flex items-center justify-center">
                  <AvailabilityChart />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:col-span-2">
                <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">Distribuição por Quadro (Oficiais vs Praças)</h3>
                <div className="flex-1">
                  <RankChart />
                </div>
              </div>
            </div>

            <div className="w-full">
               <OPMSTable />
            </div>
          </div>
        )}

        {activeTab === 'top-unavailable' && (
          <TopUnavailableView onSelectOPM={handleSelectOPM} />
        )}

        {activeTab === 'opm-details' && selectedOPM && (
          <OPMDetailsView opmName={selectedOPM} onBack={handleBackToTopUnavailable} />
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
