import ReactDOM from 'react-dom/client';
import Router from './screens/Router';

import './style/Components.css';
import './style/Index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Router />
);
