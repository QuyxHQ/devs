import { LineChart, Line, ResponsiveContainer } from "recharts";

const LineGraph = ({ data: mainData }: { data: RequestGrowthResponse }) => {
  const data = Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    //@ts-ignore
    week1: mainData.week1[`day${i + 1}`],
    //@ts-ignore
    week2: mainData.week2[`day${i + 1}`],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="week1" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="week2" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
