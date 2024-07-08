'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

const LineChart = ({ year }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-jobs-chart?year=${year}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                return setChartData(res?.data?.data);
            } else {
                return;
            }
        };
        fetchChartData();
    }, [year]);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Việc làm',
                data: [
                    chartData?.janJobs?.length,
                    chartData?.febJobs?.length,
                    chartData?.marJobs?.length,
                    chartData?.aprJobs?.length,
                    chartData?.mayJobs?.length,
                    chartData?.junJobs?.length,
                    chartData?.julJobs?.length,
                    chartData?.augJobs?.length,
                    chartData?.sepJobs?.length,
                    chartData?.octJobs?.length,
                    chartData?.novJobs?.length,
                    chartData?.decJobs?.length,
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 10,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: `Biểu đồ thống kê việc làm năm ${year}`,
            },
        },
    };

    return (
        <div>
            <Line data={data} height={400} options={options} />
        </div>
    );
};

export default LineChart;
