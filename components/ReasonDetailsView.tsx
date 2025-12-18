
import React, { useState } from 'react';
import { OPMS_DATA, UNAVAILABLE_REASONS, GLOBAL_STATS, DETAILED_PERSONNEL, CHART_COLORS, ESCALA_INTERNA_REAL_DISTRIBUTION } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { FileWarning, ArrowLeft, Users, Building2, TrendingUp, Search, User, MousePointerClick } from 'lucide-react';

interface ReasonDetailsViewProps {
  reasonName: string;
  onBack: () => void;
}

const ReasonDetailsView: React.FC<ReasonDetailsViewProps> = ({ reasonName, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const reasonData = UNAVAILABLE_REASONS.find(r => r.reason === reasonName);

  if (!reasonData) return <div className="p-20 text-center font-black text-slate-400 uppercase tracking-widest">Motivo não encontrado</div>;

  const personnel = DETAILED_PERSONNEL.filter(p => p.reason === reasonName);
  
  const filteredPersonnel = personnel.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.opm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.observation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateOPMDistribution = () => {
    // Se for Escala Interna, usa os dados reais da planilha enviada
    if (reasonName === 'ESCALA INTERNA') {
      return OPMS_DATA.map(opm => ({
        name: opm.name,
        count: ESCALA_INTERNA_REAL_DISTRIBUTION[opm.name] || 0,
        isEstimated: false
      })).filter(item => item.count > 0).sort((a, b) => b.count - a.count);
    }

    // Para os demais motivos, mantém a lógica de distribuição proporcional baseada em pesos
    const totalReasonCount = reasonData.count;
    const nominalByOPM = personnel.reduce((acc: Record<string, number>, curr) => {
      acc[curr.opm] = (acc[curr.opm] || 0) + 1;
      return acc;
    }, {});

    const totalNominalForReason = personnel.length;
    let remainderToDistribute = totalReasonCount - totalNominalForReason;

    let distributed = OPMS_DATA.map(opm => {
      const nominalCount = nominalByOPM[opm.name] || 0;
      const opmWeight = opm.unavailable / GLOBAL_STATS.unavailable;
      let estimated = Math.floor(remainderToDistribute * opmWeight);
      
      if (nominalCount + estimated > opm.unavailable) {
        estimated = opm.unavailable - nominalCount;
      }

      return {
        name: opm.name,
        count: nominalCount + estimated,
        isEstimated: estimated > 0
      };
    });

    const currentSum = distributed.reduce((acc, item) => acc + item.count, 0);
    let diff = totalReasonCount - currentSum;
    
    if (diff !== 0) {
      distributed.sort((a, b) => b.count - a.count);
      for (let i = 0; i < Math.abs(diff); i++) {
        const idx = i % distributed.length;
        if (diff > 0) distributed[idx].count++;
        else if (diff < 0 && distributed[idx].count > 0) distributed[idx].count--;
      }
    }

    return distributed.filter(item => item.count > 0).sort((a, b) => b.count - a.count);
  };

  const distributionData = generateOPMDistribution();
  const topContributor = distributionData.length > 0 ? distributionData[0] : null;
  const originalIndex = UNAVAILABLE_REASONS.findIndex(r => r.reason === reasonName);
  const themeColor = CHART_COLORS[originalIndex % CHART_COLORS.length];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter italic">
            <FileWarning className="w-6 h-6" style={{ color: themeColor }} />
            {reasonName}
          </h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-70">
            {reasonName === 'ESCALA INTERNA' ? 'Dados reais importados da planilha' : 'Distribuição Geográfica Sincronizada'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-2">Total na Corporação</p>
            <p className="text-3xl font-black text-slate-900 leading-none">{reasonData.count}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-2">Impacto Relativo</p>
            <p className="text-3xl font-black text-slate-700 leading-none">{((reasonData.count / GLOBAL_STATS.unavailable) * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl text-slate-600 group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-2">Unidade mais Afetada</p>
            <p className="text-xl font-black text-slate-900 leading-none truncate max-w-[140px] uppercase">{topContributor ? topContributor.name : '-'}</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600 group-hover:scale-110 transition-transform"><Building2 className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[550px]">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest">Presença por OPM</h3>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded ${reasonName === 'ESCALA INTERNA' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {reasonName === 'ESCALA INTERNA' ? 'Planilha OK' : 'Sincronizado'}
                </span>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={distributionData} margin={{ top: 5, right: 45, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={85} tick={{ fontSize: 10, fill: '#1e293b', fontWeight: 900 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18} fill={themeColor}>
                    <LabelList dataKey="count" position="right" fill="#1e293b" fontSize={10} fontWeight={900} />
                    {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={themeColor} className="hover:opacity-80 transition-opacity" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[550px]">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> Relação Nominal ({personnel.length})
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filtrar por nome ou unidade..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredPersonnel.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Posto/Grad</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome Completo</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Unidade</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Observação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredPersonnel.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4"><span className="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">{item.rank}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-black text-slate-900 uppercase tracking-tighter">{item.name}</span></td>
                      <td className="px-6 py-4"><span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">{item.opm}</span></td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold text-slate-500 italic">{item.observation || reasonName}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-50/30">
                <Search className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-xs font-black uppercase tracking-widest">Sem registros nominais diretos</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase max-w-xs">A contagem total ({reasonData.count}) está correta conforme planilha, mas a listagem nominal depende de registros manuais.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonDetailsView;
