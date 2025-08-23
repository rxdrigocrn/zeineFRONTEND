"use client"

import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Calendar, Users } from 'lucide-react';

interface VisitorsLineChartProps {
    data: { date: string; visitors: number }[];
}


const chartConfig = {
    visitors: {
        label: 'Visitantes',
        color: 'hsl(200 90% 50%)',
    },
};
const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
    });


const VisitorsLineChart = ({ data }: VisitorsLineChartProps) => {

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const rangeLabel = `${formatDate(today)} - ${formatDate(nextMonth)}`;

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-gray-800">Visitantes</CardTitle>
                <CardDescription className="text-gray-200 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-dark" />
                    {rangeLabel}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value, index) => {
                                if (index % 3 === 0) {
                                    return value.substring(0, 2);
                                }
                                return '';
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={4}
                            domain={[0, 150]}
                        />
                        <Tooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    formatter={(value, name, props) => (
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-gray-200" />
                                            <span className="font-semibold">{value}</span>
                                            <span className="text-gray-200">visitantes</span>
                                        </div>
                                    )}
                                />
                            }
                        />
                        <Line
                            dataKey="visitors"
                            type="monotone"
                            stroke={chartConfig.visitors.color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default VisitorsLineChart;

