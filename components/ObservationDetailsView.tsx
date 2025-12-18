
import React from 'react';
import { OTHERS_OBSERVATIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { HelpCircle, ArrowLeft, Building2, LayoutList, User } from 'lucide-react';

interface ObservationDetailsViewProps {
  observationName: string;
  onBack: () => void;
}

const ObservationDetailsView: React.FC<ObservationDetailsViewProps> = ({ observationName, onBack }) => {
  // Filtrar todos os militares desta observação específica
  const personnel = OTHERS_OBSERVATIONS.filter(obs => obs.observation === observationName);
  
  const totalCount = personnel.length;
  const category = personnel.length > 0 ? personnel[0].category : 'N/A';

  // Agrupamento para o gráfico de OPMs
  const opmDistribution = personnel.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.opm);
    if (existing) {
        existing.count += 1;
    } else {
        acc.push({ name: curr.opm, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          title="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <div className="flex items-center gap-2">
             <h2 className="text-2xl font-black text-slate-900">{observationName}</h2>
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                category === 'Jurídico' ? 'bg-red-100 text-red-700' :
                category === 'Função/Cargo' ? 'bg-blue-100 text-blue-700' :
                category === 'Social/Saúde' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {category}
              </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Visualização pormenorizada nominal</p>
        </div>
      </div>

      {/* KPI Cards Específicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total de Casos</p>
            <p className="text-3xl font-black text-red-600">{totalCount}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-xl">
            <HelpCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Unidades Afetadas</p>
            <p className="text-3xl font-black text-slate-900">{opmDistribution.length}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <Building2 className="w-6 h-6 text-slate-600" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between lg:col-span-1 md:col-span-2">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Natureza do Registro</p>
            <p className="text-xl font-black text-slate-700">{category}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl">
            <LayoutList className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de OPMs */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-red-600" />
            Distribuição por OPM
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={opmDistribution}
                margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 10, fill: '#1e293b', fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" name="Casos" fill="#dc2626" radius={[0, 6, 6, 0]} barSize={24}>
                  <LabelList dataKey="count" position="right" fill="#dc2626" fontSize={11} fontWeight={900} offset={10} />
                  {opmDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#dc2626' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela Nominal Detalhada */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
             <User className="w-4 h-4 text-red-600" />
             <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Relação Nominal de Militares</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Posto / Grad</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome Completo</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Unidade (OPM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {personnel.map((item, idx) => (
                  <tr key={idx} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{item.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">{item.opm}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button 
                onClick={onBack}
                className="text-[10px] font-black text-slate-500 uppercase hover:text-red-600 transition-colors"
            >
                Voltar para lista de observações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationDetailsView;
