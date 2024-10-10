import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CurrencyChart.css';

// Activer les composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CurrencyChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          `https://api.currencyfreaks.com/latest?apikey=&symbols=USD,EUR,TND`
          // 8977e151619c4f12b1763299118f2ac4
        );
        const data = await response.json();
        const rates = data.rates;

        const hourlyLabels = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];

        const usdData = [1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.10, 1.11, parseFloat(rates.USD)];
        const eurData = [0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1.00, 1.01, parseFloat(rates.EUR)];
        const tndData = [2.85, 2.86, 2.87, 2.88, 2.89, 2.90, 2.91, 2.92, 2.93, 2.94, 2.95, parseFloat(rates.TND)];

        const chartData = {
          labels: hourlyLabels,
          datasets: [
            {
              label: 'USD',
              data: usdData,
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'EUR',
              data: eurData,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'TND',
              data: tndData,
              borderColor: '#FFCE56',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        };

        setChartData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des devises:', error);
      }
    };

    fetchCurrencyData();
  }, []);

  if (loading) return <div>Chargement des données...</div>;

  return (
    <div className="currency-chart-container">
      <h2 className="currency-chart-title">Courbe des taux de change USD, EUR, TND</h2>
      <div className="chart-wrapper">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CurrencyChart;
