
// Import necessary dependencies from React
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

// Import action functions from Redux store
import { fetchDataOfSimpleCoin } from '../ReactReduxStore/ActionApiOfSimpleCoin';
import { fetchApiExchangeData } from '../ReactReduxStore/ActionApiOfExchange';

// Import CSS styles for the component
import '../styles/exchange.css';

// Define the ExchangeRates component
const ExchangeRates = () => {
  // Initialize the Redux dispatch function
  const dispatch = useDispatch();

  // Initialize state variables
  const [enteredValue, setEnteredValue] = useState("");
  const [sellCurrency, setSellCurrency] = useState("btc");
  const [buyCurrency, setBuyCurrency] = useState("btc");
  const [convertedValue, setConvertedValue] = useState(" ");

  // Fetch data from APIs using Redux actions on component mount
  useEffect(() => {
    dispatch(fetchDataOfSimpleCoin());
    dispatch(fetchApiExchangeData());
  }, [dispatch]);

  // Retrieve data from Redux store using useSelector hook
  const dataOfSimpleCoin = useSelector((state) => state.api7Data);
  const dataOfExchange = useSelector((state) => state.api8Data);
  const error = useSelector((state) => state.error);

  // Display error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Event handler for the sell currency dropdown change
  const handleSellChange = (e) => {
    setSellCurrency(e.target.value);
  };

  // Event handler for the buy currency dropdown change
  const handleBuyChange = (e) => {
    setBuyCurrency(e.target.value);
  };

  // Conversion formula function
  function ConversionFormula(enteredValue) {
    const convertedValue = (
      (parseFloat(enteredValue) *
        parseFloat(dataOfExchange && dataOfExchange.rates[buyCurrency].value)) /
      parseFloat(dataOfExchange && dataOfExchange?.rates[sellCurrency].value)
    ).toFixed(2);

    return convertedValue;
  }

  // Click event handler for the exchange button
  function handleClick() {
    setConvertedValue(ConversionFormula(enteredValue));
  }

  // Render the ExchangeRates component
  return (
    <>
      <div className="cont">
        <div className="wrapr">
          <p className="top">Exchange Coins</p>
          <div className="midle">
            <div className="lefft">
              <div className="dropdown-contaier">
                <p className="title" variant="sell">Sell</p>
                <div className="dropdawn" variant="sell">
                  <select className="select" onChange={handleSellChange} value={sellCurrency}>
                    <option value="sellCurrency" disabled>
                      BTC
                    </option>
                    {dataOfSimpleCoin &&
                      dataOfSimpleCoin.map((currencyName) => (
                        <option value={currencyName} key={currencyName}>
                          {currencyName.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="dropdown-contaier">
                <p className="title" variant="buy">Buy</p>
                <div className="dropdawn" variant="buy">
                  <select className="select" onChange={handleBuyChange} value={buyCurrency}>
                    <option value="sellCurrency" disabled>
                      BTC
                    </option>
                    {dataOfSimpleCoin &&
                      dataOfSimpleCoin.map((currencyName) => (
                        <option value={currencyName} key={currencyName}>
                          {currencyName.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="riht">
              <input
                className="input"
                data-testid="exchangeInput"
                placeholder="Enter value"
                value={enteredValue}
                onChange={(e) => setEnteredValue(e.target.value)}
              />
              <p className="converted-value">{convertedValue}</p>
            </div>
          </div>
          <div className="bottom">
            <button onClick={handleClick}>Exchange</button>
          </div>
        </div>
      </div>
    </>
  )
};

// Export the ExchangeRates component as the default export
export default ExchangeRates;







// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDataOfSimpleCoin } from '../ReactReduxStore/ActionApiOfSimpleCoin';
// import { fetchApiExchangeData } from '../ReactReduxStore/ActionApiOfExchange';
// import '../styles/exchange.css';

// const ExchangeRates = () => {

//   const dispatch = useDispatch();
//   const [enteredValue, setEnteredValue] = useState("");
//   const [sellCurrency, setSellCurrency] = useState("btc");
//   const [buyCurrency, setBuyCurrency] = useState("btc");
//   const [convertedValue, setConvertedValue] = useState(" ");



//   useEffect(() => {
//     dispatch(fetchDataOfSimpleCoin());
//     dispatch(fetchApiExchangeData());
//   }, [dispatch]);

//   const dataOfSimpleCoin = useSelector((state) => state.api7Data);
//   const dataOfExchange = useSelector((state) => state.api8Data);
//   const error = useSelector((state) => state.error);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//   const handleSellChange = (e) => {
//     setSellCurrency(e.target.value);
//   };
//   const handleBuyChange = (e) => {
//     setBuyCurrency(e.target.value);
//   };

//   //Fetch currency list data

//   function ConversionFormula(enteredValue) {
//     const convertedValue = (
//       (parseFloat(enteredValue) *
//         parseFloat(dataOfExchange && dataOfExchange.rates[buyCurrency].value)) /
//       parseFloat(dataOfExchange && dataOfExchange?.rates[sellCurrency].value)
//     ).toFixed(2);

//     return convertedValue;
//   }

//   function handleClick() {
//     setConvertedValue(ConversionFormula(enteredValue));
//   }

//   return (
//     <>
//       <div className="cont">
//         <div className="wrapr">
//           <p className="top">Exchange Coins</p>
//           <div className="midle">
//             <div className="lefft">
//               <div className="dropdown-contaier">
//                 <p className="title" variant="sell">Sell</p>
//                 <div className="dropdawn" variant="sell">
//                   <select className="select" onChange={handleSellChange} value={sellCurrency}>
//                     <option value="sellCurrency" disabled>
//                       BTC
//                     </option>
//                     {dataOfSimpleCoin &&
//                       dataOfSimpleCoin.map((currencyName) => (
//                         <option value={currencyName} key={currencyName}>
//                           {currencyName.toUpperCase()}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="dropdown-contaier">
//                 <p className="title" variant="buy">Buy</p>
//                 <div className="dropdawn" variant="buy">
//                   <select className="select" onChange={handleBuyChange} value={buyCurrency}>
//                     <option value="sellCurrency" disabled>
//                       BTC
//                     </option>
//                     {dataOfSimpleCoin &&
//                       dataOfSimpleCoin.map((currencyName) => (
//                         <option value={currencyName} key={currencyName}>
//                           {currencyName.toUpperCase()}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="riht">
//               <input
//               className="input"
//                 data-testid="exchangeInput"
//                 placeholder="Enter value"
//                 value={enteredValue}
//                 onChange={(e) => setEnteredValue(e.target.value)}
//               />
//               <p className="converted-value">{convertedValue}</p>
//             </div>
//           </div>
//           <div className="bottom">
//             <button onClick={handleClick}>Exchange</button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// };

// export default ExchangeRates;
