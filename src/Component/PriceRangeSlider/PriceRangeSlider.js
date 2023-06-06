import React, { useCallback, useEffect, useState, useRef } from "react";
import "./PriceRangeSlider.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

const PriceRangeSlider = ({
  min = 0,
  max,
  minVal,
  maxVal,
  setMinVal,
  setMaxVal,
  generateQueryPath,
  category,
}) => {
  const [searchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(
    parseInt(searchParams.get("maxPrice"))
  );
  const [minPrice, setMinPrice] = useState(
    parseInt(searchParams.get("minPrice"))
  );
  const [priceQueryPathLoad, setPriceQueryPathLoad] = useState(false);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    if (maxPrice) {
      maxValRef.current = maxPrice;
    }
    let maxPercent = getPercent((maxValRef.current = maxVal));
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    setMaxPrice(null);
  }, [minVal, getPercent, maxPrice, maxVal]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minPrice) {
      minValRef.current = minPrice;
    }
    let minPercent = getPercent((minValRef.current = minVal));
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    setMinPrice(null);
  }, [maxVal, getPercent, minPrice, minVal]);

  // set max and min price from query path, when the page load
  useEffect(() => {
    if (priceQueryPathLoad) return;
    if (maxPrice || minPrice) {
      setMaxVal(maxPrice);
      setMinVal(minPrice);
      setPriceQueryPathLoad(true);
    }
  }, [maxPrice, minPrice, priceQueryPathLoad, setMaxVal, setMinVal]);

  // using debounc handler making some delay for set price range in query path
  const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (...args) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        fn(...args);
      }, [delay]);
    };
  };

  const doQuery = (values) => {
    generateQueryPath({ ...values, category: category });
  };

  const handleQueryPath = debounceHandler(doQuery, 1000);

  return (
    <div>
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
            handleQueryPath({ max: maxVal, min: value });
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
            handleQueryPath({ max: value, min: minVal });
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div className="slider_value">
        <div className="slider__left-value">{minVal}</div>
        <div className="slider_value_divider">-</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
