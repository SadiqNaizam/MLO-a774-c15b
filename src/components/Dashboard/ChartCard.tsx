import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface MonthlyData {
  month: string;
  leadsCame?: number;
  leadsConverted?: number;
  totalDealSize?: number;
  closedWon?: number; 
  closedLost?: number;
}

const leadsTrackingData: MonthlyData[] = [
  { month: 'Mar', closedWon: 65, closedLost: 58 },
  { month: 'Apr', closedWon: 52, closedLost: 41 },
  { month: 'May', closedWon: 88, closedLost: 35 },
  { month: 'Jun', closedWon: 60, closedLost: 7 }, // Significant drop for closedLost
  { month: 'Jul', closedWon: 75, closedLost: 45 },
  { month: 'Aug', closedWon: 95, closedLost: 32 },
];

const leadsCameData: MonthlyData[] = [
  { month: 'Mar', leadsCame: 150 },
  { month: 'Apr', leadsCame: 130 },
  { month: 'May', leadsCame: 180 },
  { month: 'Jun', leadsCame: 120 },
  { month: 'Jul', leadsCame: 160 },
  { month: 'Aug', leadsCame: 200 },
];

const totalDealSizeData: MonthlyData[] = [
  { month: 'Mar', totalDealSize: 75000 },
  { month: 'Apr', totalDealSize: 60000 },
  { month: 'May', totalDealSize: 95000 },
  { month: 'Jun', totalDealSize: 50000 },
  { month: 'Jul', totalDealSize: 85000 },
  { month: 'Aug', totalDealSize: 110000 },
];

type TabValue = 'leadsConverted' | 'leadsCame' | 'totalDealSize';

interface ChartCardProps {
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<TabValue>('leadsConverted');

  const chartDataMap: Record<TabValue, MonthlyData[]> = {
    leadsConverted: leadsTrackingData,
    leadsCame: leadsCameData,
    totalDealSize: totalDealSizeData,
  };

  const currentChartData = chartDataMap[activeTab];

  const renderChart = () => {
    switch (activeTab) {
      case 'leadsConverted':
        return (
          <AreaChart data={currentChartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 'dataMax + 10']}/>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              labelStyle={{ color: 'hsl(var(--card-foreground))' }}
            />
            <Legend iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
            <Area type="monotone" dataKey="closedWon" name="Closed Won" stroke="#14B8A6" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="closedLost" name="Closed Lost" stroke="#F43F5E" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </AreaChart>
        );
      case 'leadsCame':
        return (
          <AreaChart data={currentChartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
             <defs>
              <linearGradient id="colorLeadsCame" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 'dataMax + 20']}/>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              labelStyle={{ color: 'hsl(var(--card-foreground))' }}
            />
            <Legend iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
            <Area type="monotone" dataKey="leadsCame" name="Leads Came" stroke="#3B82F6" fillOpacity={1} fill="url(#colorLeadsCame)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </AreaChart>
        );
      case 'totalDealSize':
        return (
          <AreaChart data={currentChartData} margin={{ top: 5, right: 20, left: -5, bottom: 5 }}>
             <defs>
              <linearGradient id="colorDealSize" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${(Number(value)/1000)}k`} domain={[0, 'dataMax + 10000']}/>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Deal Size']}
            />
            <Legend iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
            <Area type="monotone" dataKey="totalDealSize" name="Total Deal Size" stroke="#F59E0B" fillOpacity={1} fill="url(#colorDealSize)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Leads tracking</CardTitle>
            {activeTab === 'leadsConverted' && (
              <div className="mt-1 text-sm text-muted-foreground">
                <span className="text-lg font-semibold text-card-foreground">680</span> total closed &nbsp;
                <span className="text-lg font-semibold text-card-foreground">70</span> total lost
              </div>
            )}
          </div>
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-full sm:w-[180px] text-xs sm:text-sm">
              <CalendarDays className="h-4 w-4 mr-2 opacity-50" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-12-months">Last 12 months</SelectItem>
              <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="mt-4">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex">
            <TabsTrigger value="leadsCame" className="text-xs sm:text-sm">Leads Came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs sm:text-sm">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealSize" className="text-xs sm:text-sm">Total Deals Size</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="h-[350px] pt-2 pb-0 -ml-2 sm:ml-0">
        <ResponsiveContainer width="99%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
