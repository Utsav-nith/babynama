import React,{useState,useEffect} from 'react';
import { IoPlayCircle } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { FaPauseCircle } from "react-icons/fa";
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hrs=Math.floor(minutes/60);
  const mins=Math.floor((minutes-60*hrs));
  useEffect(() => {
    let countdown;
    
    if (isPlaying && !isPaused) {
      countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              clearInterval(countdown);
              setIsPlaying(false);
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isPlaying, isPaused, hours, minutes, seconds]);

  const startCountdown = () => {
    if (!isNaN(parseInt(inputValue))) {
      setIsPlaying(true);
      setMinutes(parseInt(inputValue, 10));
    }
  };

  const resetCountdown = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setInputValue(0);
  };

  const pauseCountdown = () => {
    setIsPaused(true);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (!isPlaying) {
      setMinutes(isNaN(parseInt(newValue)) ? 0 : parseInt(newValue, 10));
    } else {
      resetCountdown();
    }
  };

  return (
    <div id='container'>
      <div className='wrapper'>
      <label htmlFor="minutes">Enter Minutes </label>
      <input
        className='round'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      </div>
        <div className='timer'>
          {String(Math.floor(hrs)).padStart(2, '0')}:
          {String(Math.floor(mins)).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>
      <div className='buttons'>
      <IoPlayCircle onClick={startCountdown} disabled={isPlaying}/>
      <GrPowerReset onClick={resetCountdown}/>
      <FaPauseCircle onClick={pauseCountdown} disabled={!isPlaying || isPaused}/>
      </div>
    </div>

  );
}

export default App;
