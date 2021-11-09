import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { EssentialProvider } from './Assets/EssentialContext';

ReactDOM.render(
    <EssentialProvider>
      <App />
    </EssentialProvider>,
  document.getElementById('root')
);

