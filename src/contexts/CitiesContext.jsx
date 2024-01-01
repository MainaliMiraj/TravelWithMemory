import { createContext, useEffect, useState, useContext } from "react";

const CitiContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setisLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error loading the data");
      } finally {
        setisLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setisLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error loading the data");
    } finally {
      setisLoading(false);
    }
  }

  async function createTheCity(newCity) {
    try {
      setisLoading(true);
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities(cities=>[...cities,data])
    } catch {
      alert("Error loading the data");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <CitiContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createTheCity,
      }}
    >
      {children}
    </CitiContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiContext);
  if (context === undefined)
    throw new Error("CitiContext was used outside the Provider.");
  return context;
}

export { CitiesProvider, useCities };
