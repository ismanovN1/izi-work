import ReactDOM from 'react-dom/client';
import App from './src/App';
import { store } from 'store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
  module.hot.accept();
}
