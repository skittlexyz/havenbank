import { useRef } from "react";
import AreaChart from "../components/AreaChart";
import Aside from "../components/Aside"

import QuickActions from "../components/QuickActions";
import PageTitle from "../components/PageTitle";
import NotificationBell from "../components/Notifications";

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
            <main className="w-full h-full flex flex-col py-8 sm:px-16 lg:px-16 gap-8">
                <PageTitle text={"Dashboard"} button={<NotificationBell />}/>
                <div className="flex w-full h-full gap-8 lg:flex-row flex-col">
                    <div className="w-fit h-full flex flex-col gap-8">
                        <QuickActions />

                    </div>
                    <div className="w-full h-full flex flex-col gap-8">
                        <div className="w-full h-64" ref={mainRef}><AreaChart data={data} parentRef={mainRef} /></div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard