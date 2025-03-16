
import { useEffect, useState } from "react";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const emissionsData = [
  { name: "Jan", emissions: 120 },
  { name: "Feb", emissions: 140 },
  { name: "Mar", emissions: 100 },
  { name: "Apr", emissions: 78 },
  { name: "May", emissions: 86 },
  { name: "Jun", emissions: 90 },
  { name: "Jul", emissions: 110 },
  { name: "Aug", emissions: 105 },
  { name: "Sep", emissions: 95 },
  { name: "Oct", emissions: 88 },
  { name: "Nov", emissions: 82 },
  { name: "Dec", emissions: 75 },
];

const pieData = [
  { name: "Transport", value: 45 },
  { name: "Energy", value: 30 },
  { name: "Food", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#27AE60", "#6FCF97", "#E9F7EF", "#219653"];

const comparisonData = [
  { name: "You", carbon: 5.2 },
  { name: "Avg. Person", carbon: 8.4 },
  { name: "Goal 2030", carbon: 3.0 },
];

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <section id="dashboard" className="py-16 bg-secondary/50 dark:bg-muted/20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Your Carbon Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your carbon emissions and see how they compare to global averages.
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Monthly Emissions */}
          <div className="col-span-1 lg:col-span-2 glassmorphism rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Monthly Carbon Emissions</h3>
            <div className="h-72">
              <ChartContainer
                config={{
                  emissions: {
                    label: "CO2 Emissions",
                    theme: { light: "#27AE60", dark: "#6FCF97" }
                  },
                }}
              >
                <AreaChart data={emissionsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-emissions)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-emissions)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="emissions" 
                    name="emissions"
                    stroke="var(--color-emissions)" 
                    fillOpacity={1} 
                    fill="url(#colorEmissions)" 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>

          {/* Emissions Breakdown */}
          <div className="glassmorphism rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Emissions Breakdown</h3>
            <div className="h-72 flex items-center justify-center">
              <PieChart width={250} height={250}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="col-span-1 lg:col-span-3 glassmorphism rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-2">How You Compare</h3>
            <div className="h-72">
              <ChartContainer
                config={{
                  carbon: {
                    label: "CO2 Tons per Year",
                    theme: { light: "#27AE60", dark: "#6FCF97" }
                  },
                }}
              >
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="carbon" name="carbon" radius={[4, 4, 0, 0]} fill="var(--color-carbon)" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
