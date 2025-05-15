import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MarketingApp } from './components/marketingApp';
import {AuthApp} from './components/authApp';
import Header from './components/Header';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';


const generateClassName = createGenerateClassName({
  // instead of generating classnames as jss1, jss2 it will create ma1, ma2
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Switch>
            <Route path='/auth' component={AuthApp}></Route>
            <Route path="/" component={MarketingApp}></Route>
          </Switch>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
