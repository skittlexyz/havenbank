import AreaChart from "../components/AreaChart";
import Aside from "../components/Aside"
import Background from "../components/Background"

function Dashboard() {
    const data = [
        { date: '2025-01-01', value: 0 },
        { date: '2025-02-01', value: 10 },
        { date: '2025-02-01', value: 20 },
        { date: '2025-03-01', value: 30 },
        { date: '2025-04-01', value: 40 },
        { date: '2025-05-01', value: 50 },
        { date: '2025-05-01', value: 60 },
        { date: '2025-05-01', value: 70 },
        { date: '2025-05-01', value: 80 },
        { date: '2025-05-01', value: 90 },
        { date: '2025-06-01', value: 100 },
    ];

    return (
        <div className="w-screen h-screen flex">
            <Aside />
            <AreaChart data={data} />
            <Background />
        </div>
    )
}

export default Dashboard