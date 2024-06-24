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

const Chart = ({ year }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-candidate-chart?year=${year}`, {
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
                label: 'Đơn ứng tuyển',
                data: [
                    chartData?.janApp?.length,
                    chartData?.febApp?.length,
                    chartData?.marApp?.length,
                    chartData?.aprApp?.length,
                    chartData?.mayApp?.length,
                    chartData?.junApp?.length,
                    chartData?.julApp?.length,
                    chartData?.augApp?.length,
                    chartData?.sepApp?.length,
                    chartData?.octApp?.length,
                    chartData?.novApp?.length,
                    chartData?.decApp?.length,
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
                text: 'Biểu đồ thống kê đơn ứng tuyển năm 2024',
            },
        },
    };

    return (
        <div>
            <Line data={data} height={400} options={options} />
        </div>
    );
};

export default Chart;
