import React, { useEffect, useState } from 'react'; 
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from 'react-redux';

import { sugar, addSugarData } from '../../../reduxModules/data';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";  // Import Firebase Authentication

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

  const [title, setTitle] = useState('Vinegar');
  const [productMode, setProductMode] = useState('Vinegar');  // State for the product mode
  const [temperature, setTemperature] = useState(30); // Default temperature
  const [phLevel, setPhLevel] = useState(8.5); // Default pH level

  const [sugarTemperatureChart, setSugarTemperatureChart] = useState({
    data: {},
    options: initialChartOptions,
    plugins: [],
  });

  const [sugarPHChart, setSugarPHChart] = useState({
    data: {},
    options: initialChartOptions,
    plugins: [],
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
    if (!isEmpty(sugarData)) {
      const labels = sugarData.reduce((i, v) => {
        i.push(moment(v.timestamp)?.format('LTS'));
        return i;
      }, []);

      if (!isEmpty(labels)) {
        let options = {
          ...sugarTemperatureChart?.options,
          plugins: {
            ...sugarTemperatureChart?.options?.plugins,
            title: {
              display: true,
              text: `Temperature in °C (${moment(sugarData?.[0]?.timestamp).format('LL')}) - ${productMode}`,
            },
          },
        };

        setSugarTemperatureChart({
          ...sugarTemperatureChart,
          data: {
            labels,
            datasets: [
              {
                label: 'Temperature in °C',
                data: sugarData?.map((s) => s?.temperature),
                borderColor: '#c0392b',
                backgroundColor: '#e74c3c',
              },
            ],
          },
          options,
        });

        setSugarPHChart({
          ...sugarPHChart,
          data: {
            labels,
            datasets: [
              {
                label: 'pH Level',
                data: sugarData?.map((s) => s?.ph),
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
                text: `pH Level (${moment(sugarData?.[0]?.timestamp).format('LL')}) - ${productMode}`,
              },
            },
          },
        });
      }
    }
  }, [sugarData, productMode]);  // Ensure charts update when productMode changes

  return (
    <div className='dashboard_container'>
      <div className='title_container'>
        <h3>{title}</h3>
      </div>

      {/* Show authentication error if any */}
      {authError && (
        <div className="auth-error">
          <p>Error: {authError}</p>
        </div>
      )}

      <div className='data_container'>
        <div className='temperature'>
          {!isEmpty(sugarData) && !isEmpty(sugarTemperatureChart?.data) && (
            <>
              {!isEmpty(sugarData) && sugarData?.length > 0 && (
                <h4>
                  {temperature}°C
                  <p className="fs-6 fst-italic fw-bold fs-3">Temperature</p>
                </h4>
              )}
              <Line height="50" data={sugarTemperatureChart?.data} options={sugarTemperatureChart?.options} />
            </>
          )}
        </div>
        <div className='ph'>
          {!isEmpty(sugarData) && !isEmpty(sugarPHChart?.data) && (
            <>
              {!isEmpty(sugarData) && sugarData?.length > 0 && (
                <h4>
                  {phLevel} pH
                  <p className="fs-6 fst-italic fw-bold fs-3">pH Level</p>
                </h4>
              )}
              <Line height="50" data={sugarPHChart?.data} options={sugarPHChart?.options} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
