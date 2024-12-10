import React, { useEffect, useState } from 'react'; 
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from 'react-redux';

import { sugar, addSugarData, resetSugarData, vinegar, addVinegarData, resetVinegarData, wine, addWineData, resetWineData } from '../../../reduxModules/data';
import { VINEGAR, SUGAR, WINE } from '../../../constants/productType'; 
import { getDatabase, ref, onValue, off } from 'firebase/database';
import Dropdown from 'react-bootstrap/Dropdown';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import './dashboard.scss';
import isEmpty from '../../../utils/isEmpty';

const initialChartOptions = {
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
      right: 100,
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const sugarData = useSelector(sugar);
  const vinegarData = useSelector(vinegar);
  const wineData = useSelector(wine);

  const [limit, setLimit] = useState(30);

  const [temperatureChart, setTemperatureChart] = useState({
    data: {},
    options: initialChartOptions,
    plugins: [],
  });

  const [PHChart, setPHChart] = useState({
    data: {},
    options: initialChartOptions,
    plugins: [],
  });

  const [firebaseData, setFirebaseData] = useState({
    temperature: null,
    ph: null,
    type: null,
  });

  useEffect(() => {
    const dbRef = ref(getDatabase(), '/ProtoReadings'); 
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFirebaseData({
          temperature: data.Temperature,
          ph: data.pH,
          type: data.Type,
        });
      }
    });
    return () => {
      off(dbRef); 
    };
  }, []); 
  useEffect(() => {
    dispatch(resetSugarData());
    dispatch(resetVinegarData());
    dispatch(resetWineData());
  }, [firebaseData?.type]); 

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isEmpty(firebaseData?.temperature) && !isEmpty(firebaseData?.ph)){
        const data = {
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
          temperature: firebaseData?.temperature,
          ph: firebaseData?.ph,
        }
        if (firebaseData?.type?.toLowerCase() === SUGAR){
          dispatch(addSugarData(data));
        } else if (firebaseData?.type?.toLowerCase() === VINEGAR){
          dispatch(addVinegarData(data));
        } else if (firebaseData?.type?.toLowerCase() === WINE) {
          dispatch(addWineData(data));
        }
        
      }
    }, 500); 

    return () => clearInterval(interval); 
  }, [dispatch, firebaseData]); 

  useEffect(() => {
    
    let data = [];

    if(firebaseData?.type?.toLowerCase() === SUGAR){
      data = sugarData;
    } else if (firebaseData?.type?.toLowerCase() === VINEGAR) {
      data = vinegarData;
    } else if (firebaseData?.type?.toLowerCase() === WINE) {
      data = wineData;
    }
    
    data = data.slice((limit * -1)) // limit to 20 data
    
    if (!isEmpty(data)) {
      const labels = data.reduce((i, v) => {
        i.push(moment(v.timestamp)?.format('LTS'));
        return i;
      }, []);
      if (!isEmpty(labels)) {
        let options = {
          ...temperatureChart?.options,
          plugins: {
            ...temperatureChart?.options?.plugins,
            title: {
              display: true,
              text: `Temperature in °C (${moment(data?.[0]?.timestamp).format('LL')})`,
            },
          },
        };

        setTemperatureChart({
          ...temperatureChart,
          data: {
            labels,
            datasets: [
              {
                label: 'Temperature in °C',
                data: data?.map((s) => s?.temperature),
                borderColor: '#c0392b',
                backgroundColor: '#e74c3c',
              },
            ],
          },
          options,
        });

        setPHChart({
          ...PHChart,
          data: {
            labels,
            datasets: [
              {
                label: 'pH Level',
                data: data?.map((s) => s?.ph),
                borderColor: '#2980b9',
                backgroundColor: '#3498db',
              },
            ],
          },
          options: {
            ...options,
            plugins: {
              ...options?.plugins,
              title: {
                text: `pH Level (${moment(data?.[0]?.timestamp).format('LL')})`,
              },
            },
          },
        });
      }
    }
  }, [sugarData, vinegarData, wineData]); 
  
  return (
    <div className='dashboard_container'>
      <div className='title_container'>
        <h3>{firebaseData?.type}</h3>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Limit: {limit}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>setLimit(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={()=>setLimit(20)}>20</Dropdown.Item>
            <Dropdown.Item onClick={()=>setLimit(30)}>30</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='data_container'>
        <div className='temperature'>
          {!isEmpty(temperatureChart?.data) && (
            <>
              {!isEmpty(firebaseData?.temperature) && (
                <h4>
                  {firebaseData?.temperature}°C
                  <p className="fs-6 fst-italic fw-bold fs-3">Temperature</p>
                </h4>
              )}
              <Line height="50" data={temperatureChart?.data} options={temperatureChart?.options} />
            </>
          )}
        </div>
        <div className='ph'>
          {!isEmpty(PHChart?.data) && (
            <>
              {!isEmpty(firebaseData?.ph) && (
                <h4>
                  {firebaseData?.ph} pH
                  <p className="fs-6 fst-italic fw-bold fs-3">pH Level</p>
                </h4>
              )}
              <Line height="50" data={PHChart?.data} options={PHChart?.options} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
