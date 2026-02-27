import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer, LineChart, Line,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, PieChart, Pie, Cell
} from "recharts";

/* ---------------- GITHUB CARD COMPONENT ---------------- */
const GHCard = ({ children }) => (
  <div className="bg-white border border-[#d0d7de] rounded-lg shadow-sm">
    {children}
  </div>
);

/* ---------------- MOCK DATA ---------------- */
const monthlyData = {
  "2024-01": {
    month: "January 2024",
    summary: {
      workingDays: 22,
      presentDays: 20,
      absentDays: 1,
      halfDays: 1,
      totalHours: 176.5,
      avgEfficiency: 92,
    },
    performance: {
      attendanceRate: 91,
      punctuality: 88,
      productivity: 92,
      consistency: 90,
    },
    breaks: {
      totalBreaks: 42,
      teaBreaks: 28,
      lunchBreaks: 14,
      avgBreakTime: "32 mins",
    },
    trends: [
      { week: "Week 1", hours: 42.5, efficiency: 92 },
      { week: "Week 2", hours: 38.5, efficiency: 90 },
      { week: "Week 3", hours: 43.0, efficiency: 94 },
      { week: "Week 4", hours: 38.5, efficiency: 91 },
    ],
    dailyData: [
      { date: "2024-01-01", status: "holiday" },
      { date: "2024-01-02", status: "present" },
      { date: "2024-01-03", status: "present" },
      { date: "2024-01-04", status: "present" },
      { date: "2024-01-05", status: "present" },
      { date: "2024-01-06", status: "weekend" },
      { date: "2024-01-07", status: "weekend" },
      { date: "2024-01-08", status: "present" },
      { date: "2024-01-09", status: "present" },
      { date: "2024-01-10", status: "half-day" },
      { date: "2024-01-11", status: "present" },
      { date: "2024-01-12", status: "present" },
      { date: "2024-01-13", status: "weekend" },
      { date: "2024-01-14", status: "weekend" },
      { date: "2024-01-15", status: "present" },
      { date: "2024-01-16", status: "present" },
      { date: "2024-01-17", status: "present" },
      { date: "2024-01-18", status: "present" },
      { date: "2024-01-19", status: "present" },
      { date: "2024-01-20", status: "weekend" },
      { date: "2024-01-21", status: "weekend" },
      { date: "2024-01-22", status: "absent" },
      { date: "2024-01-23", status: "present" },
      { date: "2024-01-24", status: "present" },
      { date: "2024-01-25", status: "present" },
      { date: "2024-01-26", status: "present" },
      { date: "2024-01-27", status: "weekend" },
      { date: "2024-01-28", status: "weekend" },
      { date: "2024-01-29", status: "present" },
      { date: "2024-01-30", status: "present" },
      { date: "2024-01-31", status: "present" },
    ],
  },
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReportData(monthlyData[selectedMonth]);
      setLoading(false);
    }, 700);
  }, [selectedMonth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-[#24292f] text-[14px] leading-5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-[20px] font-semibold">Monthly attendance report</h1>
            <p className="text-[#57606a]">Performance overview</p>
          </div>

          <div className="flex gap-2">
            <select
              className="h-8 px-3 border border-[#d0d7de] rounded-md"
              value={selectedMonth}
              onChange={(e)=>setSelectedMonth(e.target.value)}
            >
              <option value="2024-01">January 2024</option>
            </select>

            <button className="h-8 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700">
              Export PDF
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            ["Present Days", reportData.summary.presentDays],
            ["Absent Days", reportData.summary.absentDays],
            ["Total Hours", reportData.summary.totalHours],
            ["Efficiency", reportData.summary.avgEfficiency + "%"],
            ["Breaks", reportData.breaks.totalBreaks],
          ].map((c,i)=>(
            <GHCard key={i}>
              <div className="p-4">
                <p className="text-[#57606a] text-[12px]">{c[0]}</p>
                <h2 className="text-[24px] font-semibold">{c[1]}</h2>
              </div>
            </GHCard>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6">

          <GHCard>
            <div className="p-5">
              <h3 className="font-semibold text-[16px] mb-4">Weekly trend</h3>
              <div className="h-[260px]">
                <ResponsiveContainer>
                  <LineChart data={reportData.trends}>
                    <CartesianGrid stroke="#eaeef2"/>
                    <XAxis dataKey="week"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line dataKey="hours" stroke="#0d9488" strokeWidth={3}/>
                    <Line dataKey="efficiency" stroke="#06b6d4" strokeWidth={3}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GHCard>

          <GHCard>
            <div className="p-5">
              <h3 className="font-semibold text-[16px] mb-4">Performance</h3>
              <div className="h-[260px]">
                <ResponsiveContainer>
                  <BarChart data={[
                    { name:"Attendance", value: reportData.performance.attendanceRate },
                    { name:"Punctuality", value: reportData.performance.punctuality },
                    { name:"Productivity", value: reportData.performance.productivity },
                    { name:"Consistency", value: reportData.performance.consistency },
                  ]}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#0d9488" radius={[6,6,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GHCard>
        </div>

        {/* GITHUB HEATMAP */}
        <GHCard>
          <div className="p-5">
            <h3 className="font-semibold text-[16px] mb-4">
              Attendance heatmap — {reportData.month}
            </h3>

            <div className="grid grid-cols-7 gap-[3px]">
              {reportData.dailyData.map(day => {
                const colors = {
                  present:"bg-emerald-500",
                  absent:"bg-red-400",
                  "half-day":"bg-yellow-400",
                  weekend:"bg-[#ebedf0]",
                  holiday:"bg-purple-400"
                };

                return (
                  <div
                    key={day.date}
                    title={`${day.date} • ${day.status}`}
                    className={`w-4 h-4 rounded-sm ${colors[day.status]}`}
                  />
                );
              })}
            </div>
          </div>
        </GHCard>

      </div>
    </div>
  );
}