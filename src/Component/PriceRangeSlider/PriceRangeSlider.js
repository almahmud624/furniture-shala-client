import React, { useCallback, useEffect, useState, useRef } from "react";
import "./PriceRangeSlider.css";
import { useSearchParams } from "react-router-dom";

const PriceRangeSlider = ({
  min = 0,
  max,
  setMinVal,
  setMaxVal,
  generateQueryPath,
  category,
  filterInfo,
  setFilterInfo,
}) => {
  const [searchParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(
    parseInt(searchParams.get("maxPrice"))
  );
  const [minPrice, setMinPrice] = useState(
    parseInt(searchParams.get("minPrice"))
  );

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
    const minPercent = getPercent(filterInfo?.minVal);
    if (maxPrice) {
      maxValRef.current = maxPrice;
    }
    let maxPercent = getPercent((maxValRef.current = filterInfo?.maxVal));
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    setMaxPrice(null);
  }, [filterInfo, getPercent, maxPrice]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minPrice) {
      minValRef.current = minPrice;
    }
    let minPercent = getPercent((minValRef.current = filterInfo?.minVal));
    const maxPercent = getPercent(filterInfo?.maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    setMinPrice(null);
  }, [getPercent, minPrice, filterInfo]);

  // using debounce handler making some delay for set price range in query path
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
    generateQueryPath({ ...values, ...filterInfo });
  };

  const handleQueryPath = debounceHandler(doQuery, 1000);
  return (
    <div>
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={filterInfo?.minVal}
          onChange={(event) => {
            const value = Math.min(
              Number(event.target.value),
              filterInfo?.maxVal - 1
            );
            setFilterInfo({ ...filterInfo, minVal: value });
            minValRef.current = value;
            handleQueryPath({ max: filterInfo?.maxVal, min: value });
          }}
          className="thumb thumb--left"
          style={{ zIndex: filterInfo?.minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={filterInfo?.maxVal}
          onChange={(event) => {
            const value = Math.max(
              Number(event.target.value),
              filterInfo?.minVal + 1
            );
            setFilterInfo({ ...filterInfo, maxVal: value });
            maxValRef.current = value;
            handleQueryPath({ max: value, min: filterInfo?.minVal });
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div className="slider_value">
        <div className="slider__left-value">${filterInfo?.minVal}</div>
        <div className="slider_value_divider">-</div>
        <div className="slider__right-value">${filterInfo?.maxVal}</div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
