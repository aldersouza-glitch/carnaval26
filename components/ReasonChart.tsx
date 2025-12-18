
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { UNAVAILABLE_REASONS, CHART_COLORS } from '../constants';

interface ReasonChartProps {
  onSelectReason?: (reason: string) => void;
}

const ReasonChart: React.FC<ReasonChartProps> = ({ onSelectReason }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={UNAVAILABLE_REASONS}
          margin={{ top: 5, right: 55, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="reason" 
            type="category" 
            width={150} 
            tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Tooltip 
             cursor={{ fill: '#f8fafc' }}
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Bar 
            dataKey="count" 
            name="Quantidade" 
            radius={[0, 6, 6, 0]} 
            barSize={28}
            onClick={(data) => onSelectReason && onSelectReason(data.reason)}
            className={onSelectReason ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
          >
            <LabelList 
              dataKey="count" 
              position="right" 
              fill="#64748b" 
              fontSize={12} 
              fontWeight={700}
              offset={10}
            />
            {UNAVAILABLE_REASONS.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReasonChart;
