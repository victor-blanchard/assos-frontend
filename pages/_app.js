import '../styles/globals.css';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';


function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

export default App;
