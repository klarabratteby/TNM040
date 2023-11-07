import logo from "./logo.svg";
import "./App.css";
import countries from "world-countries";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react";

// Sort, largest to smallest area
countries.sort((a, b) => b.area - a.area);

// Remove/filter antarctica
const filtered = countries.filter(
  (country) => country.name.common !== "Antarctica"
);
// Filter so that the 15 largest countries appear first
const sliced = filtered.slice(0, 15); // first 15 countries
const FirstList = sliced.slice(0, 5); // split the first 5 into FirstList
const SecondList = sliced.slice(5, 15); // split the remaining 10 countries into SecondList

// Russia is the reference point
let russia = sliced[0].area;

// Component for the country list
function CountryList() {
  console.log(getCountryByCca3);

  const [searchString, setSearchString] = useState("");
  // Update when user types
  function changeList(event) {
    setSearchString(event.target.value);
  }
  // Function to match countries based on search
  const matchText = (country) => {
    const lowerCaseWord = searchString.toLowerCase();
    const lowerCaseCountry = country.name.common.toLowerCase();
    // Start on 0 to match the first letter
    return lowerCaseCountry.indexOf(lowerCaseWord) === 0;
  };
  // Filter the countries based on the search input (matchtext = the search)
  const finalList = filtered.filter(matchText);
  // Display maximum of 5 countries per search
  const slicedfinalList = finalList.slice(0, 5);

  // Return search box
  return (
    <div className="container">
      <div className="box">
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={changeList}
        />

        <div>
          <div className="flex1">
            {slicedfinalList.map((x) => (
              // False for no details about countries, data collects props
              <CountryInfo key={x.cca3} detailed={false} data={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// Component for country information
const CountryInfo = (props) => {
  const country = props.data;
  const detailed = props.detailed;
  // Convert the area from a larger unit to million km^2
  const area = props.data.area / 1000000;
  let bredd = (country.area / russia) * 90 + "%";
  // Link = each country in the list becomes a link to the relevant URL
  // a country object is passed in as a prop called data
  return (
    <div className="firstpage">
      <Link to={"/country/" + country.cca3}>
        <div className="countryName">
          <p>
            {" "}
            <b> {country.name.common} </b> {area.toFixed(1)} million km
            <sup>2</sup>{" "}
          </p>
          <div id="bar" style={{ width: bredd }}>
            {" "}
          </div>

          {detailed ? (
            // detailed = true -> information about the country will be displayed
            // detailed = false -> no display
            <div>
              <b> {country.flag} Capital: </b> {country.capital}
              <b> Region: </b> {country.region}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </Link>
    </div>
  );
};
// Switch and Route, the route of our CountryDetails to be /country/:cca3
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/country/:cca3" component={CountryDetails} />

          <Route path="/">
            <CountryList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
// Function to get country information by cca3 code
const getCountryByCca3 = (cca3) => {
  let getCountryByCca3 = filtered.find((found) => found.cca3 === cca3);

  return getCountryByCca3;
};

console.log(filtered);
// Component to display country details
function CountryDetails(props) {
  console.log("props: ", props);
  // Match params with cca3
  let cca3i = props.match.params.cca3;
  // Name on country
  let name = getCountryByCca3(cca3i).name.common;
  // Bordering countries
  let borders = getCountryByCca3(cca3i).borders;
  console.log(cca3i);
  console.log(borders);
  let countries = borders.map(getCountryByCca3);

  console.log(countries);

  return (
    <div>
      <div>
        <Link to="/">Back to search</Link> <h1> Border countries of {name}</h1>{" "}
      </div>

      <div className="box">
        {" "}
        {countries
          // Largest area first
          .sort((a, b) => b.area - a.area)
          .map((x) => (
            <CountryInfo key={x.cca3} detailed={false} data={x} />
          ))}
      </div>
    </div>
  );
}

export default App;
