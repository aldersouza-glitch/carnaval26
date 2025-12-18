
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { OPMS_DATA } from '../constants';
import { TrendingDown, MousePointerClick } from 'lucide-react';

interface TopUnavailableViewProps {
  onSelectOPM?: (opmName: string) => void;
  onSelectReason?: (reasonName: string) => void;
}

const TopUnavailableView: React.FC<TopUnavailableViewProps> = ({ onSelectOPM, onSelectReason }) => {
  const top8Data = [...OPMS_DATA]
    .sort((a, b) => b.unavailable - a.unavailable)
    .slice(0, 8);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
               <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Top 8 OPMs com Maior Indisponibilidade</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-70">Unidades que demandam maior atenção operacional.</p>
            </div>
          </div>
          {onSelectOPM && (
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 uppercase">
              <MousePointerClick className="w-4 h-4" />
              Clique na barra para detalhes
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={top8Data} 
                      layout="vertical" 
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={100} 
                            tick={{fontSize: 10, fill: '#1e293b', fontWeight: 900}} 
                            interval={0}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                        />
                        <Bar 
                          dataKey="unavailable" 
                          name="Indisponíveis" 
                          radius={[0, 6, 6, 0]} 
                          barSize={32}
                          onClick={(data) => onSelectOPM && onSelectOPM(data.name)}
                          className="cursor-pointer"
                        >
                            <LabelList dataKey="unavailable" position="right" fill="#1e293b" fontSize={11} fontWeight="900" />
                            {top8Data.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill="#3b82f6" 
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                              />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* List/Ranking */}
            <div className="bg-slate-50 rounded-2xl p-4 h-[450px] overflow-y-auto border border-slate-200">
                <h3 className="font-black text-slate-800 mb-3 text-[10px] uppercase tracking-widest flex justify-between items-center border-b border-slate-200 pb-2">
                    <span>Ranking Absoluto</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-normal">Total / Indisp. / %</span>
                </h3>
                <div className="space-y-3">
                    {top8Data.map((item, idx) => {
                         const percent = item.total > 0 ? ((item.unavailable / item.total) * 100).toFixed(1) : '0.0';
                         return (
                            <div 
                              key={item.name} 
                              className="flex flex-col p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                              onClick={() => onSelectOPM && onSelectOPM(item.name)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black mr-2 ${idx < 3 ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-slate-200 text-slate-600'}`}>
                                            {idx + 1}
                                        </span>
                                        <span className="font-black text-slate-800 text-xs uppercase tracking-tight group-hover:text-blue-700 transition-colors">{item.name}</span>
                                    </div>
                                    <div className="font-black text-blue-600 text-lg">{item.unavailable}</div>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${percent}%`}}></div>
                                </div>
                                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>T: {item.total}</span>
                                    <span className="text-blue-500">{percent}% Comprom.</span>
                                </div>
                            </div>
                         );
                    })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopUnavailableView;
