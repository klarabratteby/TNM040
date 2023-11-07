// Component CountryInfo, creates div-elemnt. Country Info displays information about a country.
const CountryInfo = ({data, maxwidth, details}) => {
    console.log(data)
    let ratio = data.area / maxwidth;
    let bredd = (ratio*100) + "%";
    let mil = data.area / 1000000;
    mil = mil.toFixed(1); //one decimal.
  
    return (
      <><div className="container">
        <p class="name">{data.name.common}</p>  <p class="area">{mil} million km <sup>2</sup> </p>
        <div className= "bar" style={{width: bredd}}> </div>
        <div> {details // boolean prop details.
          ? <p> Capital: {data.capital} <br></br> Region: {data.subregion}</p>: <p></p>
        }</div>
        </div></>
    )
  }

  export default CountryInfo;