import React from 'react';
import './Home.css'; // Import your CSS for styling
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Home = () => {
  const data = {
    labels: ['Maharashtra', 'Gujarat', 'Bihar', 'Other'],
    datasets: [
      {
        label: '# of Votes',
        data: [38.6, 22.5, 30.8, 8.1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Overview</h1>
      <div className="card-container">
        {/* Total Users */}
        <div className="card">
          <div className="card-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="card-info">
            <p>Total User</p>
            <h2>40,689</h2>
            <span className="positive">8.5% Up from yesterday</span>
          </div>
        </div>

        {/* Tender Listed */}
        <div className="card">
          <div className="card-icon">
            <i className="fas fa-list-alt"></i>
          </div>
          <div className="card-info">
            <p>Tender Listed</p>
            <h2>10,293</h2>
            <span className="positive">1.3% Up from past week</span>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="card">
          <div className="card-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="card-info">
            <p>Recent Updates</p>
            <h2>2,040</h2>
            <span className="positive">1.8% Up from yesterday</span>
          </div>
        </div>

        {/* Total Sales */}
        <div className="card">
          <div className="card-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="card-info">
            <p>Total Sales</p>
            <h2>$89,000</h2>
            <span className="negative">4.3% Down from yesterday</span>
          </div>
        </div>
      </div>
      {/* Traffic by States (assuming you have a component or will use a library like Chart.js) */}
      <div className="chart-container">
        {/* Insert your chart component here */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Home;
