// import { useState } from 'react';
import './style.css';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
    const { state } = useLocation();
    const uid = state?.userId;

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

    let curDate = new Date().toLocaleDateString("en-US");
    const [weekHours, setWeekHours] = useState([]);
    const [monthlyContributions, setMonthlyContributions] = useState([]);
    const [dates, setDates] = useState([]);
    const [hours, setHours] = useState([]);
    const [streak, setStreak] = useState(0);
    const [uname, setUname] = useState("");

    useEffect(() => {
        if (!uid) {
            console.log("uid is null");
            return;
        };
        console.log("uid = " + uid);
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
            const datesTemp = [];
            const hoursTemp = [];

            logsData[0].forEach(log => {
                // console.log("log = " + log);
                const [date, hour] = log.split('-');
                datesTemp.push(date);
                hoursTemp.push(parseInt(hour));
            });

            setDates(datesTemp);
            setHours(hoursTemp);

            // Initialize array for last 7 days' hours
            const weeklyHours = new Array(7).fill(0);

            for (let i = 0; i < 7; i++) {
                // Get date for current index
                const currentDate = new Date(curDate);
                currentDate.setDate(currentDate.getDate() - i);

                // Convert to string format matching dates array
                const dateStr = currentDate.toLocaleDateString("en-US");

                // Find index of this date in dates array
                const dateIndex = datesTemp.indexOf(dateStr);

                // If date exists in dates array, get corresponding hours value
                if (dateIndex !== -1) {
                    weeklyHours[i] = hoursTemp[dateIndex];
                }
            }

            setWeekHours(weeklyHours.reverse());

            // Initialize array for last 30 days' contribution data
            const monthlyContributionsTemp = new Array(30).fill(0);

            for (let i = 0; i < 30; i++) {
                // Get date for current index
                const currentDate = new Date(curDate);
                currentDate.setDate(currentDate.getDate() - i);

                // Convert to string format matching dates array
                const dateStr = currentDate.toLocaleDateString("en-US");

                // Find index of this date in dates array
                const dateIndex = datesTemp.indexOf(dateStr);

                // If date exists in dates array, get corresponding hours value
                if (dateIndex !== -1) {
                    monthlyContributionsTemp[i] = hoursTemp[dateIndex];
                }
            }

            // Reverse array so most recent dates are at the end
            setMonthlyContributions(monthlyContributionsTemp.reverse());
        };
        fetchLogs();
    }, [uid]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome {uname.toUpperCase()}!</h1>
            </div>

            {/* Shows key metrics and statistics like daily/weekly/monthly hours, productivity and project stats */}
            <div className="dashboard-box">
                <h2 className="box-title">Your Stats</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>{dates[dates.length - 1] === curDate ? hours[hours.length - 1] + 'h' : '0h'}</h3>
                        <p>Today</p>
                    </div>
                    <div className="stat-item">
                        <h3>{weekHours.reduce((acc, curr) => acc + curr, 0)}h</h3>
                        <p>This Week</p>
                    </div>
                    <div className="stat-item">
                        <h3>{monthlyContributions.reduce((acc, curr) => acc + curr, 0)}h</h3>
                        <p>This Month</p>
                    </div>
                    <div className="stat-item">
                        <h3>85%</h3>
                        <p>Productivity</p>
                    </div>
                    <div className="stat-item">
                        <h3>41</h3>
                        <p>Commits</p>
                    </div>
                    <div className="stat-item">
                        <h3>8</h3>
                        <p>Projects</p>
                    </div>
                </div>
            </div>

            {/* Displays a bar chart showing coding hours for the last 7 days with daily average */}
            <div className="dashboard-box">
                <h2 className="box-title">Coding Time - {((weekHours.reduce((acc, curr) => acc + curr, 0) / weekHours.length).toFixed(1))} hrs avg</h2>
                <div className="chart">
                    {[...Array(7)].map((_, index) => (
                        <div className="barCont" key={index} title={`${weekHours[index]} hours`} style={{ gridTemplateRows: `2fr ${Math.max(...weekHours) - weekHours[index]}fr ${weekHours[index] || 0.15}fr` }}>
                            <div className="barTxt">{weekHours[index]}</div>
                            <div className="noBar"></div>
                            <div className="bar"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shows a contribution grid displaying coding activity for the last 30 days with current streak */}
            <div className="dashboard-box">
                <h2 className="box-title">Streaks - {streak} days</h2>
                <div className="contribution-grid">
                    {[...Array(30)].map((_, weekIndex) => (
                        [...Array(1)].map((_, dayIndex) => {
                            const contributions = monthlyContributions[weekIndex];
                            const color = contributions !== 0 ? '#FF6500' : '#2C2C2E';
                            return (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className="contribution-box" style={{ backgroundColor: color }}
                                    title={`${contributions} hours`}
                                >
                                    {contributions === 0 ? '-' : contributions}
                                </div>
                            );
                        })
                    ))}
                </div>
            </div>

            {/* Will display most active projects with commit counts and progress bars */}
            <div className="dashboard-box">
                <h2 className="box-title">Top Projects</h2>
                <div className="coming-soon-box">Coming Soon</div>
            </div>

            {/* Will show top performers based on coding hours with rank badges */}
            <div className="dashboard-box">
                <h2 className="box-title">Leaderboard</h2>
                <div className="coming-soon-box">Coming Soon</div>
            </div>
        </div>
    );
}

export default Dashboard;
