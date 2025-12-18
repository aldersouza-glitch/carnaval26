
import React from 'react';
import { OPMS_DATA, UNAVAILABLE_REASONS, GLOBAL_STATS, CHART_COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Building2, ArrowLeft, Users, UserX, PieChart } from 'lucide-react';

interface OPMDetailsViewProps {
  opmName: string;
  onBack: () => void;
}

const OPMDetailsView: React.FC<OPMDetailsViewProps> = ({ opmName, onBack }) => {
  const opmData = OPMS_DATA.find(opm => opm.name === opmName);

  if (!opmData) return <div className="p-8 text-center text-slate-500">OPM não encontrada</div>;

  const generateOPMReasons = () => {
    if (opmData.unavailable === 0) return [];
    let remaining = opmData.unavailable;
    const reasons = UNAVAILABLE_REASONS.map((reason, index) => {
      const globalWeight = reason.count / GLOBAL_STATS.unavailable;
      const nameFactor = (opmName.length + index) % 3 === 0 ? 1.1 : 0.9;
      let count = Math.floor(opmData.unavailable * globalWeight * nameFactor);
      if (count < 0) count = 0;
      if (count > remaining) count = remaining;
      remaining -= count;
      return { ...reason, count };
    });
    if (remaining > 0) reasons[0].count += remaining;
    return reasons.filter(r => r.count > 0).sort((a, b) => b.count - a.count);
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
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            {opmName}
          </h2>
          <p className="text-sm text-slate-500 font-medium">Análise detalhada da unidade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest text-[10px]">Efetivo Total</p>
            <p className="text-2xl font-black text-slate-900">{opmData.total}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><Users className="w-5 h-5" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest text-[10px]">Indisponíveis</p>
            <p className="text-2xl font-black text-red-600">{opmData.unavailable}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-red-600"><UserX className="w-5 h-5" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest text-[10px]">Taxa Comprometida</p>
            <p className="text-2xl font-black text-slate-700">{percentUnavailable}%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-slate-600"><PieChart className="w-5 h-5" /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">Principais Motivos em {opmName}</h3>
        {opmData.unavailable > 0 ? (
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={specificReasons} margin={{ top: 5, right: 55, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="reason" type="category" width={180} tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" name="Quantidade" radius={[0, 6, 6, 0]} barSize={28}>
                  <LabelList dataKey="count" position="right" fill="#64748b" fontSize={12} fontWeight={700} offset={10} />
                  {specificReasons.map((entry, index) => {
                    const originalIndex = UNAVAILABLE_REASONS.findIndex(r => r.reason === entry.reason);
                    return <Cell key={`cell-${index}`} fill={CHART_COLORS[originalIndex % CHART_COLORS.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-400 font-medium bg-slate-50 rounded-lg">Unidade com 100% de disponibilidade operacional.</div>
        )}
      </div>
    </div>
  );
};

export default OPMDetailsView;
