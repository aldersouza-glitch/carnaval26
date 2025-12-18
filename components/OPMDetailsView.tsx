
import React from 'react';
import { OPMS_DATA, UNAVAILABLE_REASONS, GLOBAL_STATS, CHART_COLORS, DETAILED_PERSONNEL, ESCALA_INTERNA_REAL_DISTRIBUTION } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Building2, ArrowLeft, Users, UserX, PieChart, Info, MousePointerClick } from 'lucide-react';

interface OPMDetailsViewProps {
  opmName: string;
  onBack: () => void;
  onSelectReason: (reason: string) => void;
}

const OPMDetailsView: React.FC<OPMDetailsViewProps> = ({ opmName, onBack, onSelectReason }) => {
  const opmData = OPMS_DATA.find(opm => opm.name === opmName);

  if (!opmData) return <div className="p-8 text-center text-slate-500 font-black uppercase tracking-widest">OPM não encontrada</div>;

  const generateOPMReasons = () => {
    if (opmData.unavailable === 0) return [];
    
    const realPersonnelForOPM = DETAILED_PERSONNEL.filter(p => p.opm === opmName);
    const realCountsByReason = realPersonnelForOPM.reduce((acc: Record<string, number>, curr) => {
      acc[curr.reason] = (acc[curr.reason] || 0) + 1;
      return acc;
    }, {});

    // Prioridade 1: Escala Interna vinda diretamente da planilha enviada pelo usuário
    const escalaInternaCount = ESCALA_INTERNA_REAL_DISTRIBUTION[opmName] || 0;

    // Prioridade 2: Outros militares nominais identificados
    const totalIdentifiedExclEscala = realPersonnelForOPM.filter(p => p.reason !== 'ESCALA INTERNA').length;
    
    // Calcular resíduo para distribuição proporcional dos outros motivos (Exceto Escala Interna que já é fixo)
    let remainingToDistribute = opmData.unavailable - escalaInternaCount - totalIdentifiedExclEscala;
    if (remainingToDistribute < 0) remainingToDistribute = 0;

    const distribution = UNAVAILABLE_REASONS.map((reason) => {
      // Se for escala interna, usa o valor fixo da planilha
      if (reason.reason === 'ESCALA INTERNA') {
        return {
            reason: reason.reason,
            count: escalaInternaCount,
            isEstimated: false
        };
      }

      // Para os outros, calcula o peso ignorando a escala interna no denominador para ser justo
      const globalWeight = reason.count / (GLOBAL_STATS.unavailable - 339);
      const realCount = realCountsByReason[reason.reason] || 0;
      
      let estimatedCount = Math.floor(remainingToDistribute * globalWeight);
      if (estimatedCount < 0) estimatedCount = 0;

      return {
        reason: reason.reason,
        count: realCount + estimatedCount,
        isEstimated: estimatedCount > 0
      };
    });

    // Ajuste fino para bater com o total indisponível da OPM
    const currentSum = distribution.reduce((acc, item) => acc + item.count, 0);
    let diff = opmData.unavailable - currentSum;
    
    if (diff !== 0) {
      // Ajusta em motivos secundários para não mexer no dado real de Escala Interna
      const idx = distribution.findIndex(d => d.reason === 'GUARDA');
      if (idx !== -1) distribution[idx].count += diff;
    }

    return distribution.filter(r => r.count > 0).sort((a, b) => b.count - a.count);
  };

  const specificReasons = generateOPMReasons();
  const percentUnavailable = ((opmData.unavailable / opmData.total) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter italic">
            <Building2 className="w-6 h-6 text-blue-600" />
            {opmName}
          </h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-70">Análise Detalhada Baseada na Planilha Oficial</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-2">Efetivo Total</p>
            <p className="text-3xl font-black text-slate-900 leading-none">{opmData.total}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-red-200 transition-colors">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-2">Indisponíveis</p>
            <p className="text-3xl font-black text-red-600 leading-none">{opmData.unavailable}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-xl text-red-600 group-hover:scale-110 transition-transform"><UserX className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-colors">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-2">Taxa de Comprometimento</p>
            <p className="text-3xl font-black text-slate-700 leading-none">{percentUnavailable}%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl text-slate-600 group-hover:scale-110 transition-transform"><PieChart className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
           <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Motivos Detectados em {opmName}</h3>
           <div className="flex items-center gap-2 text-[9px] text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 font-black uppercase">
              <MousePointerClick className="w-3 h-3" />
              Clique para Detalhe Nominal
           </div>
        </div>
        
        {opmData.unavailable > 0 ? (
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={specificReasons} margin={{ top: 5, right: 55, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="reason" type="category" width={180} tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 900 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                <Bar 
                  dataKey="count" 
                  name="Quantidade" 
                  radius={[0, 6, 6, 0]} 
                  barSize={28}
                  onClick={(data) => onSelectReason(data.reason)}
                  className="cursor-pointer"
                >
                  <LabelList dataKey="count" position="right" fill="#1e293b" fontSize={12} fontWeight={900} offset={10} />
                  {specificReasons.map((entry, index) => {
                    const originalIndex = UNAVAILABLE_REASONS.findIndex(r => r.reason === entry.reason);
                    return <Cell key={`cell-${index}`} fill={CHART_COLORS[originalIndex % CHART_COLORS.length]} className="hover:opacity-80 transition-opacity" />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-400 font-black uppercase tracking-widest bg-slate-50 rounded-2xl border border-dashed border-slate-200">Disponibilidade Operacional Total.</div>
        )}
      </div>
    </div>
  );
};

export default OPMDetailsView;
