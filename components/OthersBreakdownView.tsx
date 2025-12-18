
import React, { useState } from 'react';
import { OTHERS_OBSERVATIONS, UNAVAILABLE_REASONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { HelpCircle, Search, Building2, Info, TrendingDown, MousePointerClick, User } from 'lucide-react';

interface OthersBreakdownViewProps {
  onSelectObservation?: (obsName: string) => void;
}

const OthersBreakdownView: React.FC<OthersBreakdownViewProps> = ({ onSelectObservation }) => {
  const othersTotal = OTHERS_OBSERVATIONS.length;
  const [searchTerm, setSearchTerm] = useState('');

  // Agrupamento por Observação para ranking a partir dos registros individuais
  const observationRanking = OTHERS_OBSERVATIONS.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.observation);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: curr.observation, count: 1, category: curr.category });
    }
    return acc;
  }, []).sort((a, b) => b.count - a.count);

  const filteredPersonnel = OTHERS_OBSERVATIONS.filter(p => 
    p.observation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.opm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Cabeçalho de Resumo Real */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <HelpCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Deep Dive: Detalhes do Motivo 'OUTROS'</h2>
            <p className="text-slate-600 mt-1 max-w-2xl">
              Detalhamento nominal e por observação dos casos que não se enquadram nas categorias padrão. 
              Agora com identificação de <strong>Posto/Graduação e Nome</strong>.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="text-center px-8 py-4 bg-red-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <p className="text-xs text-red-100 uppercase font-bold tracking-widest">Registros Totais</p>
                <p className="text-4xl font-black text-white">{othersTotal}</p>
            </div>
            {onSelectObservation && (
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    <MousePointerClick className="w-3 h-3" />
                    Clique nas barras para filtrar militares
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Gráfico de Ranking de Observações */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            Distribuição por Tipo de Observação
          </h3>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={observationRanking.slice(0, 15)}
                margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={220} 
                  tick={{ fontSize: 10, fill: '#1e293b', fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                    dataKey="count" 
                    name="Casos" 
                    fill="#dc2626" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                    onClick={(data) => onSelectObservation && onSelectObservation(data.name)}
                    className={onSelectObservation ? 'cursor-pointer' : ''}
                >
                  <LabelList dataKey="count" position="right" fill="#dc2626" fontSize={11} fontWeight={900} offset={10} />
                  {observationRanking.slice(0, 15).map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? '#dc2626' : '#ef4444'} 
                        className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Relação Nominal Completa */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Relação Nominal do Motivo 'OUTROS'
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Pesquisar militar, OPM ou motivo..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Posto/Grad</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome do Militar</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">OPM</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredPersonnel.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600">{item.rank}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-900">{item.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">{item.opm}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{item.observation}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OthersBreakdownView;
