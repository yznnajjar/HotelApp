import {useState} from "react";
import HotelDatePicker from './pages/HotelDatePicker'
import HotelListing from './pages/HotelListing'
import './App.scss';
const App = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  return (
    <div className="App">
      <HotelDatePicker
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        setIsSearchButtonClicked={setIsSearchButtonClicked}
      />
      <HotelListing
        startDate={startDate}
        endDate={endDate}
        isSearchButtonClicked={isSearchButtonClicked}
      />
    </div>
  );
}

export default App;
