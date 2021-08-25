import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Shelf from '../Shelf';
import FloatCart from '../FloatCart';

const App = () => (
  <React.Fragment>
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Shelf} />
          <Route path="/checkout" render={props => <FloatCart {...props} />} />
        </Switch>
      </BrowserRouter>
    </main>
  </React.Fragment>
);

export default App;
