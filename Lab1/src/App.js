import logo from "./logo.svg";
import "./App.css";
import countries from "world-countries";
import CountryInfo from "./Components/CountryInfo";

// Sort/slice the countries.
countries.sort((a, b) => b.area - a.area); // Sorted by area.
const Filtered = countries.filter(
  (country) => country.name.common !== "Antarctica"
); // Remove Antartica
const Sliced = Filtered.slice(0, 15); // Slice Filter, new list!
const FirstList = Filtered.slice(0, 5); // List of the first five countries.
const SecondList = Filtered.slice(6, 15); // List of the countries from the 6th to the 15th.

// Creates props
function App() {
  console.log(Sliced);
  return (
    <>
      <div className="colum">
        <div className="left">
          {FirstList.map((country) => (
            <CountryInfo
              Key={country.cca3}
              details={true}
              data={country}
              maxwidth={countries[0].area}
            />
          ))}
        </div>
        <div className="right">
          {SecondList.map((country) => (
            <CountryInfo
              Key={country.cca3}
              details={false}
              data={country}
              maxwidth={countries[0].area}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
