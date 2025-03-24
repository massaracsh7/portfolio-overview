import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { Asset } from '../types/types';
import { RootState } from '../store/store';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioDiagram = () => {
  const portfolio: Asset[] = useSelector((state: RootState) => state.assets);

  const data = {
    labels: portfolio.map((asset) => asset.name), 
    datasets: [
      {
        data: portfolio.map((asset) => asset.portfolioShare),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
      },
    ],
  };

  return (
    <div>
      <h3>Диаграмма распределения активов</h3>
      <Pie data={data} />
    </div>
  );
};

export default PortfolioDiagram;