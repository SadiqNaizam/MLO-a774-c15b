import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  color: string;
  averageTimeTooltip?: string;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, duration: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, duration: '2 days', color: 'bg-yellow-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, duration: '5 days', color: 'bg-sky-600', averageTimeTooltip: 'Average time on this stage' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, duration: '8 days', color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, duration: '10 days', color: 'bg-purple-500' },
];

const totalActiveLeads = 600;

// Calculate proportions for the visual bar based on current counts
const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface StatsCardProps {
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold">{totalActiveLeads}</span>
            <span className="ml-2 text-muted-foreground">active leads</span>
          </div>

          <div className="flex h-3 mb-6 rounded-full overflow-hidden">
            {funnelData.map(stage => (
              <div
                key={stage.id}
                className={cn("h-full", stage.color)}
                style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
                title={`${stage.name}: ${stage.count}`}
              ></div>
            ))}
          </div>

          <ul className="space-y-3">
            {funnelData.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
                <div className={cn("w-3 h-3 rounded-full", stage.color)}></div>
                <div className="text-card-foreground truncate">{stage.name}</div>
                <div className="text-muted-foreground text-right">{stage.count}</div>
                <div className="text-muted-foreground text-right">$ {stage.value}</div>
                <div className="text-muted-foreground text-right flex items-center justify-end">
                  {stage.duration}
                  {stage.averageTimeTooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 ml-1 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stage.averageTimeTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default StatsCard;
