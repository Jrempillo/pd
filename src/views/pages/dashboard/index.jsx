import React, { useEffect, useState } from 'react'; 
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from 'react-redux';

<<<<<<< HEAD
import { sugar, addSugarData } from '../../../reduxModules/data';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";  // Import Firebase Authentication
=======
import { sugar, addSugarData, resetSugarData, vinegar, addVinegarData, resetVinegarData, wine, addWineData, resetWineData } from '../../../reduxModules/data';
import { VINEGAR, SUGAR, WINE } from '../../../constants/productType'; 
import { getDatabase, ref, onValue, off } from 'firebase/database';
import Dropdown from 'react-bootstrap/Dropdown';
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122

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
<<<<<<< HEAD
  
=======
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
  const sugarData = useSelector(sugar);
  const vinegarData = useSelector(vinegar);
  const wineData = useSelector(wine);

<<<<<<< HEAD
  const [title, setTitle] = useState('Sugar');
=======
  const [limit, setLimit] = useState(30);
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122

  const [temperatureChart, setTemperatureChart] = useState({
    data: {},
    options: initialChartOptions,
    plugins: [],
  });

  const [PHChart, setPHChart] = useState({
    data: {},
    options: initialChartOptions,
    plugins: [],
<<<<<<< HEAD
=======
  });

  const [firebaseData, setFirebaseData] = useState({
    temperature: null,
    ph: null,
    type: null,
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
  });

  // New state for Firebase data
  const [firebaseData, setFirebaseData] = useState({
    temperature: null,
    ph: null,
    type: null,
  });

  const [authError, setAuthError] = useState(null);  // State to store any authentication error

  // Firebase Authentication: Sign in with email and password
  useEffect(() => {
    const auth = getAuth();
    
    const email = "jo23mar112300@gmail.com";
    const password = "demo123";

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        // Handle authentication error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        setAuthError(errorMessage);  // Store error message in state
      });
  }, []);  // Empty dependency array, so it runs only once when the component mounts

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const dbRef = ref(getDatabase(), '/ProtoReadings'); // Reference to the /ProtoReadings path in the database
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFirebaseData({
          temperature: data.Temperature,
          ph: data.pH,
          type: data.Type,
        });

        // Update the state based on the fetched data
        setTemperature(data.Temperature);
        setPhLevel(data.pH);
        setProductMode(data.Type);
        setTitle(data.Type); // Update the title based on the Type
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      off(dbRef); // Correct way to detach the listener in Firebase v9+
    };
  }, []);  // This will only run once when the component mounts

  useEffect(() => {
    // Dispatch the initial data when the component mounts with Firebase values for temperature and pH
    dispatch(addSugarData({
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      temperature: temperature,
      ph: phLevel,
    }));

    let interval = setInterval(() => {
      // Update the temperature and pH levels at regular intervals
      dispatch(addSugarData({
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        temperature: temperature,
        ph: phLevel,
      }));
    }, 500); // Update every 0.5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [dispatch, temperature, phLevel]);  // Rerun when temperature or phLevel changes

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
<<<<<<< HEAD
              text: `Temperature in °C (${moment(sugarData?.[0]?.timestamp).format('LL')}) - ${productMode}`,
=======
              text: `Temperature in °C (${moment(data?.[0]?.timestamp).format('LL')})`,
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
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
<<<<<<< HEAD
                data: sugarData?.map((s) => s?.temperature),
=======
                data: data?.map((s) => s?.temperature),
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
                borderColor: '#c0392b',
                backgroundColor: '#e74c3c',
              },
            ],
          },
          options,
        });
<<<<<<< HEAD
        

        setSugarPHChart({
          ...sugarPHChart,
=======

        setPHChart({
          ...PHChart,
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
          data: {
            labels,
            datasets: [
              {
                label: 'pH Level',
<<<<<<< HEAD
                data: sugarData?.map((s) => s?.ph),
=======
                data: data?.map((s) => s?.ph),
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
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
<<<<<<< HEAD
                display: true,
                text: `pH Level (${moment(sugarData?.[0]?.timestamp).format('LL')})`
              }
            }
          },
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

=======
                text: `pH Level (${moment(data?.[0]?.timestamp).format('LL')})`,
              },
            },
          },
        });
      }
    }
  }, [sugarData, vinegarData, wineData]); 
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
  
  return (
    <div className='dashboard_container'>
      <div className='title_container'>
<<<<<<< HEAD
        <h3>{title}</h3>
=======
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
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
      </div>
      
      <div className='data_container'>
        <div className='temperature'>
<<<<<<< HEAD
          {!isEmpty(sugarData) && !isEmpty(sugarTemperatureChart?.data) && (
              <>
              {!isEmpty(sugarData) && sugarData?.length > 0 && <h4>{sugarData?.[sugarData?.length - 1].temperature}°C<p class="fs-6 fst-italic fw-bold fs-3">Temperature</p></h4>}
                <Line height="50" data={sugarTemperatureChart?.data} options={sugarTemperatureChart?.options} />
              </>
            )}
          </div>
          <div className='ph'>
          {!isEmpty(sugarData) && !isEmpty(sugarPHChart?.data) && (
              <>
              {!isEmpty(sugarData) && sugarData?.length > 0 && <h4>{sugarData?.[sugarData?.length - 1].ph} pH<p class="fs-6 fst-italic fw-bold fs-3">pH Level</p></h4>}
                <Line height="50" data={sugarPHChart?.data} options={sugarPHChart?.options} />
              </>
            )}
          </div>
=======
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
>>>>>>> 60713e9710c073ac5ff902fc33823b45f58cc122
      </div>
    </div>
  );
};

export default Dashboard;
