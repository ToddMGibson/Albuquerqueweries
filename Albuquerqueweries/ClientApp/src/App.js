import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { BrewerySearch } from './components/BrewerySearch';
import Details from './components/Details';

import './StyleSheet.scss'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={BrewerySearch} />
        <Route path='/details' component={Details} />
      </Layout>
    );
  }
}
