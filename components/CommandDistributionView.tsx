
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { COMMAND_RANK_DATA } from '../constants';
import { ShieldCheck, Map } from 'lucide-react';

const CommandDistributionView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Map className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Distribuição Nominal por Grandes Comandos</h2>
            <p className="text-slate-600 mt-1 max-w-2xl">
              Visualização detalhada do efetivo de <strong>Praças</strong> distribuído entre as regiões operacionais. 
              Consistência visual em Azul, Verde e Vermelho.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
            <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400 uppercase font-bold">Total Praças</p>
                <p className="text-2xl font-black text-slate-800">988</p>
            </div>
            <div className="text-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-400 uppercase font-bold">Comandos</p>
                <p className="text-2xl font-black text-blue-800">5</p>
            </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg uppercase text-xs tracking-widest">Postos e Graduações por Comando</h3>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={COMMAND_RANK_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barSize={60}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="command" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1e293b', fontWeight: 700, fontSize: 13 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                
                <Bar dataKey="SD" name="Soldado" stackId="praças" fill="#2563eb">
                   <LabelList dataKey="SD" position="center" fill="#fff" fontSize={11} fontWeight="bold" />
                </Bar>
                <Bar dataKey="CB" name="Cabo" stackId="praças" fill="#16a34a">
                   <LabelList dataKey="CB" position="center" fill="#fff" fontSize={11} fontWeight="bold" />
                </Bar>
                <Bar dataKey="SGT3" name="3º Sargento" stackId="praças" fill="#dc2626">
                   <LabelList dataKey="SGT3" position="center" fill="#fff" fontSize={11} fontWeight="bold" />
                </Bar>
                <Bar dataKey="SGT2" name="2º Sargento" stackId="praças" fill="#3b82f6">
                   <LabelList dataKey="SGT2" position="center" fill="#fff" fontSize={11} fontWeight="bold" />
                </Bar>
                <Bar dataKey="SGT1" name="1º Sargento" stackId="praças" fill="#22c55e">
                   <LabelList dataKey="SGT1" position="center" fill="#fff" fontSize={11} fontWeight="bold" />
                </Bar>
                <Bar dataKey="ST" name="Subtenente" stackId="praças" fill="#ef4444" radius={[6, 6, 0, 0]}>
                   <LabelList dataKey="ST" position="top" fill="#dc2626" fontSize={11} fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Resumo Operacional</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {COMMAND_RANK_DATA.map((item) => (
                    <div key={item.command} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/50 transition-colors group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-black text-slate-700 group-hover:text-blue-600 transition-colors">{item.command}</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{item.total}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px] font-bold uppercase text-slate-400">
                            <div className="flex flex-col">
                                <span className="text-blue-600 text-sm">{item.SD}</span>
                                <span>SD</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green-600 text-sm">{item.CB}</span>
                                <span>CB</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-red-600 text-sm">{item.SGT3 + item.SGT2 + item.SGT1}</span>
                                <span>SGT</span>
                            </div>
                        </div>
                        <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden flex">
                            <div className="bg-blue-600 h-full" style={{ width: `${(item.SD/item.total)*100}%` }}></div>
                            <div className="bg-green-600 h-full" style={{ width: `${(item.CB/item.total)*100}%` }}></div>
                            <div className="bg-red-600 h-full" style={{ width: `${((item.SGT3+item.SGT2+item.SGT1)/item.total)*100}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Tabela Nominal de Praças</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Comando</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Subtenente</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">1º Sargento</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">2º Sargento</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">3º Sargento</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Cabo</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Soldado</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-blue-600 uppercase">Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                    {COMMAND_RANK_DATA.map((item) => (
                        <tr key={item.command} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900">{item.command}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-600">{item.ST}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-600">{item.SGT1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-600">{item.SGT2}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-600">{item.SGT3}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-600">{item.CB}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-600">{item.SD}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-black text-blue-700 bg-blue-50/30">{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default CommandDistributionView;
