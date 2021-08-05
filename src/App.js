import React, { useState, useEffect } from "react";
import Input from "./shared/Input";
import formatter from "./util/formatter";
import isInput from "./util/validator";
import Header from "./Header";
import data from "./data";
import "./App.css";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("MDL");
  const [isError, setisError] = useState(true);
  const [handleError, setHandleError] = useState(1);
  const [rate, setRate] = useState(0);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);

  //error handler
  useEffect(() => {
    isInput(handleError).then((res) => {
      setisError(res);
    });
  }, [handleError]);

  //init logic
  useEffect(() => {
    setCurrencyOptions([...data.data.exchangeRates.map((value) => value.code)]);
    setFromCurrency(data.data.exchangeRates[0].code);
    setToCurrency(data.data.exchangeRates[3].code);
  }, []);

  //rates
  useEffect(() => {
    let toCurrencyRate = data.data.exchangeRates.find(
      (value) => value.code === toCurrency
    );
    let fromCurrencyRate = data.data.exchangeRates.find(
      (value) => value.code === fromCurrency
    );
    setRate(toCurrencyRate.rate / fromCurrencyRate.rate);
  }, [toCurrency, fromCurrency]);
  useEffect(() => {
    setToAmount(formatter(fromAmount * rate));
  }, [rate]);

  //handlers
  function handleFromCurrency(event) {
    setFromCurrency(event.target.value);
  }
  function handleToCurrency(event) {
    setToCurrency(event.target.value);
  }
  function handleFromAmountChange(event) {
    const { value } = event.target;
    if (value.length > 6) {
      return;
    }
    setHandleError(value);
    setFromAmount(value);
    setToAmount(formatter(value * rate));
  }
  function handleToAmountChange(event) {
    const { value } = event.target;
    if (value.length > 6) {
      return;
    }
    setHandleError(value);
    setToAmount(value);
    setFromAmount(formatter(value / rate));
  }

  return (
    <div className="app">
      <Header />
      <Input
        onChangeCurrency={handleFromCurrency}
        selectedCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <Input
        onChangeCurrency={handleToCurrency}
        selectedCurrency={toCurrency}
        currencyOptions={currencyOptions}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
      <div style={{ color: "red" }}>{isError ? "" : "Invalid input type"}</div>
    </div>
  );
}

export default App;
