import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCard from '../components/Dashboard/StatsCard';
import PieChartCard from '../components/Dashboard/PieChartCard';
import ChartCard from '../components/Dashboard/ChartCard';
import MetricGrid from '../components/Dashboard/MetricGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          {/* Placeholder for Sales tab content */}
          <div 
            className="flex items-center justify-center h-96 rounded-lg border border-dashed shadow-sm bg-card"
            aria-label="Sales Overview Placeholder"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-card-foreground">
                Sales Overview
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed sales metrics and reports will be available here soon.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="leads">
          <div className="space-y-6">
            {/* Row 1: StatsCard and PieChartCard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StatsCard />
              </div>
              <div className="lg:col-span-1">
                <PieChartCard />
              </div>
            </div>
            
            {/* Row 2: ChartCard */}
            <div>
              <ChartCard />
            </div>
            
            {/* Row 3: MetricGrid */}
            <div>
              <MetricGrid />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainAppLayout>
  );
};

export default IndexPage;
