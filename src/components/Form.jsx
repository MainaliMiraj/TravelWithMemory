// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from './Spinner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import useUrlPosition from "../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();

  const [isLoadingGeoCoding, setIsCodingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [geoCodingError, setGeoCodingError] = useState();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(
    function () {
      if(!lat && !lng) return ;
      async function fetchCityData() {
        try {
          setIsCodingGeocoding(true);
          setGeoCodingError();
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (data.countryName === "")
            throw new Error("that's not the country you clicked.");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsCodingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  function handleSubmit(e){
    e.preventDefault();
console.log(e)
  }
  if(isLoadingGeoCoding) return <Spinner/>
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={date=>setDate(date)} selected={date} dateFormat='dd/mm/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button
          type="primary"
          style={{
            background: "lightgreen",
            padding: "10px",
            borderRadius: "20%",
          }}
        >
          Add
        </button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
