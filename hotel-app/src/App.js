import {useState} from "react";
import HotelDatePicker from './pages/HotelDatePicker'
import HotelListing from './pages/HotelListing'
import './App.scss';
const App = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="App">
      <HotelDatePicker
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <HotelListing
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default App;
