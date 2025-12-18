import React from 'react';
import { OPMS_DATA, UNAVAILABLE_REASONS, GLOBAL_STATS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { FileWarning, ArrowLeft, Users, Building2, TrendingUp } from 'lucide-react';

interface ReasonDetailsViewProps {
  reasonName: string;
  onBack: () => void;
}

const ReasonDetailsView: React.FC<ReasonDetailsViewProps> = ({ reasonName, onBack }) => {
  const reasonData = UNAVAILABLE_REASONS.find(r => r.reason === reasonName);

  if (!reasonData) return <div>Motivo não encontrado</div>;

  // Lógica de Distribuição Reversa (Simulação)
  // Como não temos os dados atômicos (Quem tem X motivo), distribuímos o total do motivo
  // entre as OPMs baseando-se no peso de indisponibilidade total de cada OPM.
  const generateOPMDistribution = () => {
    const totalReasonCount = reasonData.count;
    const globalUnavailable = GLOBAL_STATS.unavailable;

    // 1. Calcular distribuição inicial
    let distributed = OPMS_DATA.map(opm => {
      // Peso da OPM no total de indisponibilidade
      const weight = opm.unavailable / globalUnavailable;
      
      // Adiciona um pequeno fator de variação baseado no nome para não ficar exatamente igual para todos os motivos
      const variation = (reasonName.length % 2 === 0) ? 1 : 1.1;
      
      let estimatedCount = Math.floor(weight * totalReasonCount * variation);
      
      // Limite lógico: não pode ter mais gente com esse motivo do que o total de indisponíveis da OPM
      if (estimatedCount > opm.unavailable) estimatedCount = opm.unavailable;

      return {
        name: opm.name,
        totalUnavailable: opm.unavailable,
        count: estimatedCount
      };
    });

    // 2. Ajustar para bater com o total exato do motivo
    const currentSum = distributed.reduce((acc, item) => acc + item.count, 0);
    let remainder = totalReasonCount - currentSum;

    // Ordenar por quem tem mais indisponibilidade para distribuir o resto ou retirar excesso
    distributed.sort((a, b) => b.totalUnavailable - a.totalUnavailable);

    if (remainder > 0) {
      // Adicionar aos maiores
      for (let i = 0; i < remainder; i++) {
        // Loop circular caso o resto seja maior que o array
        const index = i % distributed.length;
        if (distributed[index].count < distributed[index].totalUnavailable) {
            distributed[index].count++;
        }
      }
    } else if (remainder < 0) {
      // Remover dos maiores (que receberam mais na estimativa)
      remainder = Math.abs(remainder);
      for (let i = 0; i < remainder; i++) {
        const index = i % distributed.length;
        if (distributed[index].count > 0) {
            distributed[index].count--;
        }
      }
    }

    // Filtrar apenas OPMs que tem esse motivo e reordenar
    return distributed
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const distributionData = generateOPMDistribution();
  const topContributor = distributionData.length > 0 ? distributionData[0] : null;

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
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileWarning className="w-6 h-6 text-blue-600" />
            {reasonData.reason}
          </h2>
          <p className="text-sm text-slate-500">Distribuição deste motivo entre as unidades</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total de Casos</p>
            <p className="text-3xl font-bold text-slate-900">{reasonData.count}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">% da Indisponibilidade Global</p>
            <p className="text-3xl font-bold text-slate-700">
              {((reasonData.count / GLOBAL_STATS.unavailable) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-slate-100 p-3 rounded-lg">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Maior Incidência</p>
            <p className="text-xl font-bold text-slate-900 truncate max-w-[150px]">
              {topContributor ? topContributor.name : '-'}
            </p>
            {topContributor && (
               <p className="text-xs text-slate-500">{topContributor.count} casos</p>
            )}
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <Building2 className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[600px] flex flex-col">
            <h3 className="font-semibold text-slate-800 mb-4">OPMs com "{reasonData.reason}"</h3>
            <div className="flex-1 w-full">
              {distributionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={distributionData.slice(0, 15)} // Top 15 para caber no gráfico
                    margin={{ top: 5, right: 45, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      interval={0}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [value, 'Casos']}
                    />
                    <Bar dataKey="count" name="Casos" radius={[0, 4, 4, 0]} barSize={24}>
                      <LabelList 
                        dataKey="count" 
                        position="right" 
                        fill="#475569" 
                        fontSize={12} 
                        fontWeight={600}
                      />
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Nenhuma OPM afetada por este motivo.
                </div>
              )}
            </div>
            {distributionData.length > 15 && (
              <p className="text-xs text-slate-400 text-center mt-2">
                Exibindo as 15 principais OPMs de {distributionData.length} afetadas.
              </p>
            )}
        </div>

        {/* List View */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
             <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-800">Lista Completa</h3>
             </div>
             <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {distributionData.map((item, idx) => (
                    <div key={item.name} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-400 w-6 text-center">{idx + 1}</span>
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                                <div 
                                    className="bg-blue-500 h-1.5 rounded-full" 
                                    style={{ width: `${(item.count / reasonData.count) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-900 w-8 text-right">{item.count}</span>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonDetailsView;