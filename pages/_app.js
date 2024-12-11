import '../styles/globals.css';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
//Redux
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import places from "../reducers/place";
import users from '../reducers/users';

// Redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


//Define the store
// const store = configureStore({
//   reducer: {places, users},
//  });

// Définissez le ou les reducer(s) de votre application avec la fonction combineReducers 
const reducers = combineReducers({places, users})

// Utilisez une clé de stockage pour définir un nom à votre store à l’intérieur du local storage 
const persistConfig = { key: 'LaSauce', storage };

// Mise à jour du contenu de votre store avec la fonction configureStore 
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

//  Rendre le store persistant
 const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer/>
      </PersistGate>
      </Provider>
  );
}

export default App;
