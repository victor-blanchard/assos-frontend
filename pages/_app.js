import '../styles/globals.css';
import Head from 'next/head';
import Footer from '../components/Footer';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

export default App;
