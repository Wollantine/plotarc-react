import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const rootDiv = (id: string) => {
    const div = document.createElement('div');
    div.id = id;
    return div;
}

const appElement = rootDiv('app');
document.body.appendChild(appElement);

ReactDOM.render(<App/>, appElement);
