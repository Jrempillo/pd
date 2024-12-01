import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import { useSelector, useDispatch } from 'react-redux';

import { sugar, addSugarData, resetSugarData } from '../../../reduxModules/data';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


import './dashboard.scss';
import isEmpty from '../../../utils/isEmpty';

const intialChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  layout: {
    padding: {
      left: 50,
      right: 100
    }
  }
}

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const sugarData = useSelector(sugar);

  const [title, setTitle] = useState('Sugar');

  /** SUGAR **/
  const [sugarRunning, setSugarRunning] = useState(false);

  const [sugarTemperatureChart, setSugarTemperatureChart] = useState({
    data: {},
    options: intialChartOptions,
    plugins: []
  });

  const [sugarPHChart, setSugarPHChart] = useState({
    data: {},
    options: intialChartOptions,
    plugins: []
  });

  useEffect(() => {
    if (!isEmpty(sugarData)) {
      const labels = sugarData.reduce((i, v) => {
        i.push(moment(v.timestamp)?.format('LTS'));
        return i;
      }, []);

      if (!isEmpty(labels)){
        let options = {
          ...sugarTemperatureChart?.options,
          plugins: {
            ...sugarTemperatureChart?.options?.plugins,
            title: {
              display: true,
              text: `Temperature in °C (${moment(sugarData?.[0]?.timestamp).format('LL')})`,
            },
          }
        };

        setSugarTemperatureChart({
          ...sugarTemperatureChart,
          data: {
            labels,
            datasets: [
              {
                label: 'Temperature in °C',
                data: sugarData?.map((s) => s?.temperature),
                // data: labels?.map(() => faker.number.int({ min: 10, max: 50 })),
                borderColor: '#c0392b',
                backgroundColor: '#e74c3c',
              },
            ],
          },
          options,
        });
        
        options.plugins.title.text = `pH Level (${moment(sugarData?.[0]?.timestamp).format('LL')})`;

        setSugarPHChart({
          ...sugarTemperatureChart,
          data: {
            labels,
            datasets: [
              {
                label: 'pH Level',
                data: sugarData?.map((s) => s?.ph),
                // data: labels?.map(() => faker.number.int({ min: 10, max: 50 })),
                borderColor: '#2980b9',
                backgroundColor: '#3498db',
              },
            ],
          },
          options,
        });
      }
      
    }
    
  }, [sugarData]);

  const runSugar = (sugarRunning) => {
    if (sugarRunning){
      setSugarRunning(false);
    } else {
      setSugarRunning(true);
      dispatch(resetSugarData());
      dispatch(addSugarData({
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        temperature: faker.number.int({ min: 10, max: 50 }),
        ph: faker.number.int({ min: 5, max: 7 })
      }));
    }
  }

  useEffect(() => {
    let interval;
    if (sugarRunning){
      interval = setInterval(() => {
        dispatch(addSugarData({
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
          temperature: faker.number.int({ min: 10, max: 50 }),
          ph: faker.number.int({ min: 5, max: 7 })
        }));
      }, 3000);

    } else if (interval) {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval);
  }, [sugarRunning]);

  
  return (
    <div className='dashboard_container'>
      <div className='title_container'>
        <h3>{title}</h3>
        <button type="button" class="btn btn-primary" onClick={() => runSugar(sugarRunning)}>{sugarRunning ? 'Stop' : 'Run'}</button>
      </div>
      
      <div className='data_container'>
          <div className='temperature'>
          {!isEmpty(sugarData) && !isEmpty(sugarTemperatureChart?.data) && (
              <>
              {!isEmpty(sugarData) && sugarData?.length > 0 && <h4>{sugarData?.[sugarData?.length - 1].temperature}°C<p class="fs-6 fst-italic">current temperature</p></h4>}
                <Line height="50" data={sugarTemperatureChart?.data} options={sugarTemperatureChart?.options} />
              </>
            )}
          </div>
          <div className='ph'>
          {!isEmpty(sugarData) && !isEmpty(sugarPHChart?.data) && (
              <>
              {!isEmpty(sugarData) && sugarData?.length > 0 && <h4>{sugarData?.[sugarData?.length - 1].ph} pH<p class="fs-6 fst-italic">current pH Level</p></h4>}
                <Line height="50" data={sugarPHChart?.data} options={sugarPHChart?.options} />
              </>
            )}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
