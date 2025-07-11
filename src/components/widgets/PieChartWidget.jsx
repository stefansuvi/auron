import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'];

const PieChartWidget = ({ pieData }) => {
  return (
    <div>
        <ResponsiveContainer height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartWidget