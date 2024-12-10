import '../styles/globals.css';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
//Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import places from "../reducers/place";
import users from '../reducers/users';


//Define the store
const store = configureStore({
  reducer: {places, users},
 });


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer/>
      </Provider>
  );
}

export default App;
