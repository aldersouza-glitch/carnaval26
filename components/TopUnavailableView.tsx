
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { OPMS_DATA } from '../constants';
import { TrendingDown, MousePointerClick, ListOrdered, ChevronRight } from 'lucide-react';

interface TopUnavailableViewProps {
  onSelectOPM?: (opmName: string) => void;
  onSelectReason?: (reasonName: string) => void;
}

const TopUnavailableView: React.FC<TopUnavailableViewProps> = ({ onSelectOPM, onSelectReason }) => {
  // Ordenar todas as OPMs para o gráfico completo
  const allOpmsSorted = [...OPMS_DATA].sort((a, b) => b.unavailable - a.unavailable);
  
  // Pegar apenas o Top 10 para o Ranking Lateral
  const top10Data = allOpmsSorted.slice(0, 10);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 border-b border-slate-50 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-700 rounded-xl shadow-lg shadow-blue-100">
               <TrendingDown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Mapa Geral de Indisponibilidade</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Gráfico de Todas as OPMs (Clique para ver motivos)</p>
            </div>
          </div>
          {onSelectOPM && (
            <div className="flex items-center gap-2 text-[10px] font-black text-white bg-blue-600 px-4 py-2 rounded-xl border-b-4 border-blue-800 uppercase shadow-md animate-pulse">
              <MousePointerClick className="w-4 h-4" />
              Selecione uma Unidade no gráfico
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chart - Todas as OPMs */}
            <div className="lg:col-span-3 h-[950px] bg-slate-50/50 rounded-2xl p-6 border border-slate-100 shadow-inner">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-blue-600" /> Situação Global das Unidades
                    </h3>
                    <span className="text-[9px] font-black text-slate-400 uppercase">Total de {OPMS_DATA.length} Unidades</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={allOpmsSorted} 
                      layout="vertical" 
                      margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
                      onClick={(state) => {
                        if (state && state.activeLabel && onSelectOPM) {
                            onSelectOPM(state.activeLabel as string);
                        }
                      }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#cbd5e1" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={120} 
                            tick={{fontSize: 10, fill: '#0f172a', fontWeight: 900}} 
                            interval={0}
                            axisLine={false}
                            tickLine={false}
                            className="cursor-pointer"
                        />
                        <Tooltip 
                            cursor={{fill: '#e2e8f0', opacity: 0.4}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'black', fontSize: '12px' }}
                        />
                        <Bar 
                          dataKey="unavailable" 
                          name="Militares Indisponíveis" 
                          radius={[0, 6, 6, 0]} 
                          barSize={18}
                          className="cursor-pointer"
                        >
                            <LabelList dataKey="unavailable" position="right" fill="#0f172a" fontSize={10} fontWeight="900" offset={10} />
                            {allOpmsSorted.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index < 10 ? '#dc2626' : '#2563eb'} 
                                className="hover:opacity-80 transition-opacity cursor-pointer active:scale-95"
                              />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Ranking Lateral - Top 10 APENAS conforme solicitado */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-slate-900 rounded-3xl p-6 flex-1 overflow-y-auto border-b-8 border-blue-700 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <ListOrdered className="w-6 h-6 text-blue-400" />
                        <h3 className="font-black text-white text-[14px] uppercase tracking-tighter italic">
                            Top 10 Crítico
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {top10Data.map((item, idx) => {
                             const percent = item.total > 0 ? ((item.unavailable / item.total) * 100).toFixed(1) : '0.0';
                             return (
                                <div 
                                  key={item.name} 
                                  className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-blue-600 hover:border-blue-400 transition-all cursor-pointer group relative overflow-hidden"
                                  onClick={() => onSelectOPM && onSelectOPM(item.name)}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <span className={`flex items-center justify-center w-7 h-7 rounded-lg text-[12px] font-black mr-3 ${idx < 3 ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300'}`}>
                                                {idx + 1}
                                            </span>
                                            <span className="font-black text-white text-xs uppercase tracking-tight group-hover:text-white transition-colors">{item.name}</span>
                                        </div>
                                        <div className="font-black text-blue-400 group-hover:text-white text-xl leading-none">{item.unavailable}</div>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                                        <div className="bg-blue-500 group-hover:bg-white h-2 rounded-full" style={{width: `${percent}%`}}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 group-hover:text-blue-100 uppercase tracking-widest">
                                        <span>TOTAL: {item.total}</span>
                                        <span>{percent}%</span>
                                    </div>
                                    <ChevronRight className="absolute -right-1 top-1/2 -translate-y-1/2 w-8 h-8 text-white/10 group-hover:text-white/30 transition-all" />
                                </div>
                             );
                        })}
                    </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 shadow-sm text-center">
                    <p className="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-1">Unidades Corporação</p>
                    <p className="text-4xl font-black text-blue-700">{OPMS_DATA.length}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopUnavailableView;
