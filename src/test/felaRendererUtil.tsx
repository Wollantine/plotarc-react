import * as React from 'react';
import { createRenderer } from 'fela';
import {Provider} from 'react-fela';

const felaRenderer = createRenderer();

export const renderStyles = (component: JSX.Element) => {
  return (
    <Provider renderer={felaRenderer}>
      {component}
    </Provider>
  );
};
