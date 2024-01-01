import { createContext, useEffect, useContext, useReducer } from "react";

const CitiContext = createContext();

function CitiesProvider({ children }) {
  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };

      case "cities/loaded":
        return { ...state, isLoading: false, cities: action.payload };

      case "city/loaded":
        return { ...state, isLoading: false, currentCity: action.payload };

      case "city/created":
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };

      case "city/deleted":
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
          currentCity: {},
        };

      case "rejected":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };

      default:
        throw new Error("Unknown return type.");
    }
  }

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error loading the data.",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error loading the cities.",
      });
    }
  }

  async function createTheCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error creating the city.",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error deleting the city.",
      });
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
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiContext);
  if (context === undefined) {
    throw new Error("CitiContext was used outside the Provider.");
  }
  return context;
}

export { CitiesProvider, useCities };
