
import React, { useState, useMemo, useRef } from 'react';
import { OTHERS_OBSERVATIONS, UNAVAILABLE_REASONS, OUTROS_REAL_DISTRIBUTION, OPMS_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { HelpCircle, Search, Building2, MousePointerClick, User, XCircle, LayoutList, ChevronRight } from 'lucide-react';

const OthersBreakdownView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpm, setSelectedOpm] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const othersTotal = UNAVAILABLE_REASONS.find(r => r.reason === 'OUTROS')?.count || 46;

  // Distribuição por OPM (Dados Reais da Planilha)
  const opmDistribution = useMemo(() => {
    return OPMS_DATA.map(opm => ({
      name: opm.name,
      count: OUTROS_REAL_DISTRIBUTION[opm.name] || 0
    })).filter(d => d.count > 0).sort((a, b) => b.count - a.count);
  }, []);

  // Filtragem da lista nominal
  const filteredPersonnel = useMemo(() => {
    return OTHERS_OBSERVATIONS.filter(p => {
      const matchesSearch = 
        p.observation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.opm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.rank.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesOpm = selectedOpm ? p.opm === selectedOpm : true;
      
      return matchesSearch && matchesOpm;
    });
  }, [searchTerm, selectedOpm]);

  const handleBarClick = (data: any) => {
    setSelectedOpm(data.name);
    // Pequeno delay para garantir que a renderização começou
    setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Cabeçalho de Resumo */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-600 rounded-lg shadow-lg shadow-red-100">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Motivo 'OUTROS': Relação Pormenorizada</h2>
            <p className="text-slate-500 mt-1 max-w-2xl text-xs font-black uppercase tracking-widest leading-relaxed">
                Dados oficiais: {othersTotal} militares identificados. <br/>
                <span className="text-blue-600">CLIQUE NAS BARRAS PARA VER NOMES, POSTOS E SITUAÇÕES.</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
            <div className="text-center px-6 py-3 bg-slate-900 rounded-2xl shadow-lg border-b-4 border-slate-700">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Total na Planilha</p>
                <p className="text-3xl font-black text-white">{othersTotal}</p>
            </div>
        </div>
      </div>

      {/* Gráfico de Impacto por Unidade - Interativo */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col transition-all">
        <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
                <Building2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Distribuição por OPM (Clique na Unidade)</h3>
          </div>
          <div className="flex items-center gap-2">
            {selectedOpm && (
              <button 
                onClick={() => setSelectedOpm(null)}
                className="flex items-center gap-1 text-[10px] font-black bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors uppercase shadow-sm"
              >
                <XCircle className="w-3.5 h-3.5" /> Mostrar Todos
              </button>
            )}
            <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 uppercase">Selecione para filtrar nomes</span>
          </div>
        </div>
        <div className="h-[480px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={opmDistribution} margin={{ top: 5, right: 45, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={95} 
                tick={{ fontSize: 10, fill: '#1e293b', fontWeight: 900 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                cursor={{ fill: '#fff1f1' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
              />
              <Bar 
                dataKey="count" 
                radius={[0, 6, 6, 0]} 
                barSize={24} 
                fill="#dc2626"
                className="cursor-pointer"
                onClick={handleBarClick}
              >
                <LabelList dataKey="count" position="right" fill="#dc2626" fontSize={11} fontWeight={900} />
                {opmDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedOpm === entry.name ? '#0f172a' : (index % 2 === 0 ? '#dc2626' : '#ef4444')} 
                    className="hover:opacity-80 transition-opacity" 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center border-t border-slate-50 pt-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-blue-500 animate-pulse" />
                DICA: Clique na unidade para abrir a relação nominal pormenorizada abaixo
            </p>
        </div>
      </div>

      {/* Relação Nominal Pormenorizada */}
      <div ref={detailRef} className={`bg-white rounded-2xl border-2 ${selectedOpm ? 'border-blue-600 shadow-2xl scale-[1.01]' : 'border-slate-900 shadow-xl'} overflow-hidden flex flex-col transform transition-all duration-300`}>
        <div className={`p-5 flex flex-col sm:flex-row justify-between items-center gap-4 ${selectedOpm ? 'bg-blue-600' : 'bg-slate-900'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${selectedOpm ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                <LayoutList className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-black text-white uppercase text-xs tracking-widest flex items-center gap-2">
                  {selectedOpm ? (
                    <>RELAÇÃO PORMENORIZADA: {selectedOpm} <ChevronRight className="w-4 h-4" /></>
                  ) : (
                    'RELAÇÃO NOMINAL COMPLETA: OUTROS'
                  )}
                </h3>
                <p className="text-[10px] text-blue-100 font-bold uppercase">{filteredPersonnel.length} Militares Listados</p>
            </div>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="PESQUISAR NOME OU POSTO..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[10px] font-black text-white focus:ring-2 focus:ring-blue-400 outline-none uppercase placeholder:text-white/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Posto / Grad</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome do Militar</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Unidade</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Situação / Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredPersonnel.length > 0 ? filteredPersonnel.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 group-hover:bg-blue-100 group-hover:border-blue-300 transition-all">
                        {item.rank}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-slate-900 uppercase tracking-tighter group-hover:text-blue-700 transition-colors">
                        {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-100 uppercase">
                        {item.opm}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 italic uppercase leading-tight">
                            {item.observation}
                        </span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={4} className="px-6 py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <Search className="w-12 h-12 text-slate-200" />
                            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Nenhum registro encontrado para este filtro.</p>
                            <p className="text-[10px] text-slate-300 mt-1 uppercase max-w-sm">
                                Verifique se o nome ou posto está correto.
                            </p>
                            {selectedOpm && (
                              <button onClick={() => setSelectedOpm(null)} className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-xl transition-all border border-slate-200">
                                Ver todos os militares do motivo 'OUTROS'
                              </button>
                            )}
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Relação Nomimal Pormenorizada - Efetivo Pro</p>
        </div>
      </div>
    </div>
  );
};

export default OthersBreakdownView;
