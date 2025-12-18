
import React from 'react';
import { OPMS_DATA, UNAVAILABLE_REASONS, GLOBAL_STATS, CHART_COLORS, DETAILED_PERSONNEL, ESCALA_INTERNA_REAL_DISTRIBUTION } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Building2, ArrowLeft, Users, UserX, PieChart, Info, MousePointerClick, ChevronLeft } from 'lucide-react';

interface OPMDetailsViewProps {
  opmName: string;
  onBack: () => void;
  onSelectReason: (reason: string) => void;
}

const OPMDetailsView: React.FC<OPMDetailsViewProps> = ({ opmName, onBack, onSelectReason }) => {
  const opmData = OPMS_DATA.find(opm => opm.name === opmName);

  if (!opmData) return <div className="p-20 text-center text-slate-500 font-black uppercase tracking-widest">OPM não encontrada no banco de dados.</div>;

  const generateOPMReasons = () => {
    if (opmData.unavailable === 0) return [];
    
    const realPersonnelForOPM = DETAILED_PERSONNEL.filter(p => p.opm === opmName);
    const realCountsByReason = realPersonnelForOPM.reduce((acc: Record<string, number>, curr) => {
      acc[curr.reason] = (acc[curr.reason] || 0) + 1;
      return acc;
    }, {});

    // Prioridade 1: Escala Interna (Planilha Oficial)
    const escalaInternaCount = ESCALA_INTERNA_REAL_DISTRIBUTION[opmName] || 0;

    // Prioridade 2: Militares nominais identificados
    const totalIdentifiedExclEscala = realPersonnelForOPM.filter(p => p.reason !== 'ESCALA INTERNA').length;
    
    // Calcular resíduo
    let remainingToDistribute = opmData.unavailable - escalaInternaCount - totalIdentifiedExclEscala;
    if (remainingToDistribute < 0) remainingToDistribute = 0;

    const distribution = UNAVAILABLE_REASONS.map((reason) => {
      if (reason.reason === 'ESCALA INTERNA') {
        return { reason: reason.reason, count: escalaInternaCount };
      }

      const globalWeight = reason.count / (GLOBAL_STATS.unavailable - 339);
      const realCount = realCountsByReason[reason.reason] || 0;
      
      let estimatedCount = Math.floor(remainingToDistribute * globalWeight);
      if (estimatedCount < 0) estimatedCount = 0;

      return {
        reason: reason.reason,
        count: realCount + estimatedCount
      };
    });

    // Ajuste final para bater com o total da OPM
    const currentSum = distribution.reduce((acc, item) => acc + item.count, 0);
    let diff = opmData.unavailable - currentSum;
    
    if (diff !== 0) {
      const idx = distribution.findIndex(d => d.reason === 'GUARDA' || d.reason === 'OUTROS');
      if (idx !== -1) distribution[idx].count += diff;
    }

    return distribution.filter(r => r.count > 0).sort((a, b) => b.count - a.count);
  };

  const specificReasons = generateOPMReasons();
  const percentUnavailable = ((opmData.unavailable / opmData.total) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-12">
      {/* Botão Voltar e Título */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all font-black text-xs uppercase border border-slate-200"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar ao Mapa Geral
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-700 rounded-2xl shadow-xl shadow-blue-100">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">{opmName}</h2>
            <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest mt-1">Detalhamento Completo de Motivos de Indisponibilidade</p>
          </div>
        </div>
      </div>

      {/* KPIs de Resumo da Unidade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-600 transition-all border-b-4">
          <div>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1">Efetivo Total</p>
            <p className="text-4xl font-black text-slate-900">{opmData.total}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-lg"><Users className="w-7 h-7" /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-red-600 transition-all border-b-4">
          <div>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1">Indisponíveis</p>
            <p className="text-4xl font-black text-red-600">{opmData.unavailable}</p>
          </div>
          <div className="bg-red-600 p-4 rounded-2xl text-white shadow-lg shadow-red-100"><UserX className="w-7 h-7" /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-amber-600 transition-all border-b-4">
          <div>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1">Comprometimento</p>
            <p className="text-4xl font-black text-slate-800">{percentUnavailable}%</p>
          </div>
          <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-100"><PieChart className="w-7 h-7" /></div>
        </div>
      </div>

      {/* Gráfico de Motivos da Unidade */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-slate-50 pb-6 gap-4">
           <div>
             <h3 className="font-black text-slate-900 uppercase text-sm tracking-tight italic">Distribuição de Motivos em {opmName}</h3>
             <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Todos os fatores que impactam a prontidão desta OPM</p>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 animate-bounce" />
                Clique no motivo para ver nomes
              </span>
           </div>
        </div>
        
        {opmData.unavailable > 0 ? (
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical" 
                data={specificReasons} 
                margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                    dataKey="reason" 
                    type="category" 
                    width={180} 
                    tick={{ fontSize: 11, fill: '#0f172a', fontWeight: 900 }} 
                    axisLine={false} 
                    tickLine={false} 
                />
                <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', fontWeight: 'black' }} 
                />
                <Bar 
                  dataKey="count" 
                  name="Efetivo Afetado" 
                  radius={[0, 8, 8, 0]} 
                  barSize={32}
                  onClick={(data) => onSelectReason(data.reason)}
                  className="cursor-pointer"
                >
                  <LabelList dataKey="count" position="right" fill="#0f172a" fontSize={14} fontWeight={900} offset={15} />
                  {specificReasons.map((entry, index) => {
                    const originalIndex = UNAVAILABLE_REASONS.findIndex(r => r.reason === entry.reason);
                    return (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[originalIndex % CHART_COLORS.length]} 
                            className="hover:opacity-80 transition-all cursor-pointer active:scale-95" 
                        />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 font-black uppercase tracking-widest bg-slate-50 rounded-3xl border-4 border-dashed border-slate-200">
            <Info className="w-12 h-12 mb-4 opacity-20" />
            <p>100% de Prontidão Operacional Detectada.</p>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center max-w-lg leading-relaxed">
                Os dados desta unidade são recalculados dinamicamente com base no cruzamento das relações nominais e quantitativos oficiais da corporação.
             </p>
        </div>
      </div>
    </div>
  );
};

export default OPMDetailsView;
