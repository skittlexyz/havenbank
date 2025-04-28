import { useRef } from "react";
import AreaChart from "../components/AreaChart";
import Aside from "../components/Aside"
import Background from "../components/Background"
import Card from "../components/Card";
import QuickActions from "../components/QuickActions";
import PageTitle from "../components/PageTitle";
function Dashboard() {
    const mainRef = useRef(null);
    const data = [
        { date: '2025-01-01', value: 10 },
        { date: '2025-02-01', value: -10 },
        { date: '2025-02-01', value: -20 },
        { date: '2025-03-01', value: -30 },
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
            <main className="w-full h-screen flex flex-col p-8 items-center gap-8">
                <PageTitle text={"Dashboard"}/>
                {/* <AreaChart data={data} parentRef={mainRef} /> */}
                <QuickActions />
                <div className="w-96 h-96 flex justify-center items-center" ref={mainRef}>
                </div>
            </main>
            <Background />
        </div>
    )
}

export default Dashboard