import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonLost {
  id: string;
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'proposal', percentage: 40, description: 'The proposal is unclear' as const },
  { id: 'venture', percentage: 20, description: 'However venture pursuit' as const },
  { id: 'budget', percentage: 30, description: 'Lack of budget' as const }, // Changed from duplicate
  { id: 'other', percentage: 10, description: 'Other' as const },
];

interface OtherMetric {
  id: string;
  value: string | number;
  label: string;
  tooltip?: string;
}

const otherDataMetrics: OtherMetric[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' as const },
  { id: 'avgConversionTime', value: 12, label: 'days in average to convert lead' as const },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads' as const, tooltip: 'Leads with no activity in the last 30 days.' },
];

interface MetricGridProps {
  className?: string;
}

const MetricGrid: React.FC<MetricGridProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reasonsLostData.map((reason) => (
              <div key={reason.id}>
                <p className="text-2xl font-bold text-card-foreground">{reason.percentage}%</p>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Other data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherDataMetrics.map((metric) => (
              <div key={metric.id} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <p className="text-3xl font-bold text-card-foreground">{metric.value}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{metric.label}</span>
                  {metric.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 ml-1.5 text-muted-foreground cursor-help flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default MetricGrid;
