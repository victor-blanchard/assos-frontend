import "../styles/globals.css";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Calendar, DatePicker, Input } from "antd";

// Redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Reducers
import places from "../reducers/place";
import users from "../reducers/users";
import searchResults from "../reducers/searchResults";
import associations from "../reducers/associations";

// Redux Persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Define fallback storage for server-side rendering
const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local") // Use localStorage in the browser
    : createNoopStorage(); // Fallback for SSR

// Combine reducers
const rootReducer = combineReducers({
  places,
  users,
  searchResults, 
  associations
});

// Persist configuration
const persistConfig = {
  key: "LaSauce", // Key for local storage
  storage, // Use the defined storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with Redux Toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializability checks for Redux Persist
    }),
});

// Create a persistor to persist the store
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>LaSauce.fr</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
