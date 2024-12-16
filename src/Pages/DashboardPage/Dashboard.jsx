// import { useState } from 'react';
import './style.css';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';

function Dashboard() {

    const firebaseConfig = {
        apiKey: "AIzaSyA2UWh17YyktnC7i_DWbvkWxgHt6HQzF98",
        authDomain: "devslog-97116.firebaseapp.com",
        projectId: "devslog-97116",
        storageBucket: "devslog-97116.appspot.com",
        messagingSenderId: "220123085362",
        appId: "1:220123085362:web:d55f7f3d0c776b58be9a2b",
        measurementId: "G-FNNMDMCPY0"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    const uid = "lr99MesLwfZvEthUgWFTjBIVBf52";
    let curDate = "12/14/2024";
    const [weekHours, setWeekHours] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [streak, setStreak] = useState(0);
    const [uname, setUname] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            const logsRef = collection(db, "users");
            const q = query(logsRef, where("userId", "==", uid));
            const querySnapshot = await getDocs(q);
            const logsData = [];
            querySnapshot.forEach((doc) => {
                logsData.push(doc.data().logs);
                setUname(doc.data().username);
                setStreak(doc.data().streak);
            });

            // Split log data into separate date and hour arrays
            const dates = [];
            const hours = [];

            logsData[0].forEach(log => {
                // console.log("log = " + log);
                const [date, hour] = log.split('-');
                dates.push(date);
                hours.push(parseInt(hour));
            });



            // Initialize array for last 7 days' hours
            const weeklyHours = new Array(7).fill(0);

            for (let i = 0; i < 7; i++) {
                // Get date for current index
                const currentDate = new Date(curDate);
                currentDate.setDate(currentDate.getDate() - i);

                // Convert to string format matching dates array
                const dateStr = currentDate.toLocaleDateString("en-US");

                // Find index of this date in dates array
                const dateIndex = dates.indexOf(dateStr);

                // If date exists in dates array, get corresponding hours value
                if (dateIndex !== -1) {
                    weeklyHours[i] = hours[dateIndex];
                }
            }

            setWeekHours(weeklyHours.reverse());
        };
        fetchLogs();
    }, [uid]);



    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome {uname.toUpperCase()}!</h1>
            </div>

            {/* Overview box showing key metrics like daily/weekly/monthly hours, productivity, commits and projects */}
            <div className="dashboard-box">
                <h2 className="box-title">Your Stats</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', color: '#2d3748', margin: '0' }}>4.5h</h3>
                        <p style={{ color: '#718096', fontSize: '14px', margin: '5px 0' }}>Today</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', color: '#2d3748', margin: '0' }}>32h</h3>
                        <p style={{ color: '#718096', fontSize: '14px', margin: '5px 0' }}>This Week</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', color: '#2d3748', margin: '0' }}>128h</h3>
                        <p style={{ color: '#718096', fontSize: '14px', margin: '5px 0' }}>This Month</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', color: '#2d3748', margin: '0' }}>85%</h3>
                        <p style={{ color: '#718096', fontSize: '14px', margin: '5px 0' }}>Productivity</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', color: '#2d3748', margin: '0' }}>42</h3>
                        <p style={{ color: '#718096', fontSize: '14px', margin: '5px 0' }}>Commits</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', color: '#2d3748', margin: '0' }}>8</h3>
                        <p style={{ color: '#718096', fontSize: '14px', margin: '5px 0' }}>Projects</p>
                    </div>
                </div>
            </div>

            {/* Bar chart showing coding time for the last 7 days with average */}
            <div className="dashboard-box">
                <h2 className="box-title">Coding Time - {((weekHours.reduce((acc, curr) => acc + curr, 0) / weekHours.length).toFixed(1))} hrs avg</h2>
                <div className="chart">

                    {[...Array(7)].map((_, index) => (
                        <div className="barCont" key={index} title={`${weekHours[index]} hours`} style={{ gridTemplateRows: `${Math.max(...weekHours) - weekHours[index]}fr ${weekHours[index]}fr 1fr` }}>
                            <div className="noBar"></div>
                            <div className="bar"></div>
                            {/* <div className="day">{new Date("3/3/2024").getDate() - (6 - index)}</div> */}
                        </div>
                    ))}

                </div>
            </div>

            {/* GitHub-style contribution graph showing coding streak */}
            <div className="dashboard-box">
                <h2 className="box-title">Streaks - {streak} days</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px' }}>
                    {[...Array(30)].map((_, weekIndex) => (
                        [...Array(1)].map((_, dayIndex) => {
                            // Randomly generate contribution count for demo
                            const contributions = Math.floor(Math.random() * 2); // Will generate either 0 or 1
                            let color = '#ebedf0';

                            if (contributions === 1) {
                                color = '#399918';
                            }
                            else {
                                color = '#ebedf0';
                            }

                            return (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    style={{
                                        backgroundColor: color,
                                        width: '100%',
                                        paddingBottom: '100%', // Makes it square
                                        borderRadius: '2px',
                                        position: 'relative'
                                    }}
                                    title={`${contributions} contributions`}
                                />
                            );
                        })
                    ))}
                </div>
                <div style={{ marginTop: '8px', display: 'flex', gap: '4px', justifyContent: 'center', fontSize: '12px', color: '#586069' }}>
                    <span>Less</span>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#ebedf0', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#9be9a8', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#40c463', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#30a14e', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#216e39', borderRadius: '2px' }}></div>
                    </div>
                    <span>More</span>
                </div>
            </div>

            {/* Project activity summary showing commit distribution across different project directories */}
            <div className="dashboard-box">
                <h2 className="box-title">Top Projects</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* This would ideally be populated with real data */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500' }}>src/components/Auth</div>
                            <div style={{ fontSize: '12px', color: '#586069' }}>15 commits</div>
                        </div>
                        <div style={{
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#ebedf0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '75%',
                                height: '100%',
                                backgroundColor: '#399918',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500' }}>src/pages/Dashboard</div>
                            <div style={{ fontSize: '12px', color: '#586069' }}>12 commits</div>
                        </div>
                        <div style={{
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#ebedf0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '60%',
                                height: '100%',
                                backgroundColor: '#399918',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500' }}>src/utils</div>
                            <div style={{ fontSize: '12px', color: '#586069' }}>8 commits</div>
                        </div>
                        <div style={{
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#ebedf0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '40%',
                                height: '100%',
                                backgroundColor: '#399918',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500' }}>src/components/UI</div>
                            <div style={{ fontSize: '12px', color: '#586069' }}>7 commits</div>
                        </div>
                        <div style={{
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#ebedf0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '35%',
                                height: '100%',
                                backgroundColor: '#399918',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500' }}>src/services/api</div>
                            <div style={{ fontSize: '12px', color: '#586069' }}>5 commits</div>
                        </div>
                        <div style={{
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#ebedf0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '25%',
                                height: '100%',
                                backgroundColor: '#399918',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500' }}>src/styles</div>
                            <div style={{ fontSize: '12px', color: '#586069' }}>3 commits</div>
                        </div>
                        <div style={{
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#ebedf0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '15%',
                                height: '100%',
                                backgroundColor: '#399918',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Competitive ranking showing top users by coding hours */}
            <div className="dashboard-box">
                <h2 className="box-title">Leaderboard</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#ffd700',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>1</div>
                            <div style={{ fontWeight: '500' }}>John Doe</div>
                        </div>
                        <div style={{ color: '#586069' }}>48h</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#c0c0c0',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>2</div>
                            <div style={{ fontWeight: '500' }}>Jane Smith</div>
                        </div>
                        <div style={{ color: '#586069' }}>42h</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#cd7f32',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>3</div>
                            <div style={{ fontWeight: '500' }}>Bob Wilson</div>
                        </div>
                        <div style={{ color: '#586069' }}>36h</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#ebedf0',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#586069',
                                fontWeight: 'bold'
                            }}>4</div>
                            <div style={{ fontWeight: '500' }}>Alice Brown</div>
                        </div>
                        <div style={{ color: '#586069' }}>32h</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#ebedf0',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#586069',
                                fontWeight: 'bold'
                            }}>5</div>
                            <div style={{ fontWeight: '500' }}>Charlie Davis</div>
                        </div>
                        <div style={{ color: '#586069' }}>28h</div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Dashboard;
