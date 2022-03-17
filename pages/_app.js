import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Layout from "../components/layout";
import { SSRProvider } from "react-bootstrap";


function LiveUpApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </SSRProvider>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default LiveUpApp;
