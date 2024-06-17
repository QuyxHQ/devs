import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const LineGraph = ({ data: mainData }: { data: DashboardMetrics['logs'] }) => {
    const data = Array.from({ length: 7 }, (_, i) => ({
        name: `Day ${i + 1}`,
        //@ts-ignore
        'Last week': mainData.week1[`day${i + 1}`],
        //@ts-ignore
        'This week': mainData.week2[`day${i + 1}`],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Tooltip />
                <Line type="monotone" dataKey="Last week" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="This week" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineGraph;
