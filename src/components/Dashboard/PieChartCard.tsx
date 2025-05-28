import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CalendarDays, Info } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip
} from 'recharts';

interface SourceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const leadSourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#EF4444' }, // Red
  { name: 'Behance', value: 1500, percentage: 25, color: '#F59E0B' }, // Yellow (accentYellow)
  { name: 'Instagram', value: 900, percentage: 15, color: '#14B8A6' }, // Teal
  { name: 'Dribbble', value: 600, percentage: 10, color: '#10B981' }, // Green (accentGreen)
];

interface PieChartCardProps {
  className?: string;
}

const PieChartCard: React.FC<PieChartCardProps> = ({ className }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as SourceData;
      return (
        <div className="p-2 bg-card border border-border rounded-md shadow-lg text-sm">
          <p className="font-semibold text-card-foreground">{data.name}</p>
          <p className="text-muted-foreground">Value: ${data.value.toLocaleString()}</p>
          <p className="text-muted-foreground">Share: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Sources</CardTitle>
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <CalendarDays className="h-3 w-3 mr-1.5 opacity-50" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2 h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }}/>
                <Pie
                  data={leadSourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50} // Donut chart
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {leadSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-2xl font-bold text-card-foreground">
                        {leadSourcesData.reduce((acc, curr) => acc + curr.value, 0) / 1000}K
                    </p>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-2 text-sm">
            {leadSourcesData.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></span>
                  <span className="text-card-foreground">{source.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">${source.value.toLocaleString()}</span>
                  <span className="font-medium text-card-foreground">{source.percentage}%</span>
                </div>
              </div>
            ))}
            <div className="pt-2 text-right">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="text-xs text-muted-foreground cursor-help flex items-center justify-end">
                            from leads total
                            <Info className="w-3 h-3 ml-1" />
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Percentages are based on the total value of leads from these sources.</p>
                    </TooltipContent>
                </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default PieChartCard;
