import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/layout/Header';
import LectureList from './components/lectures/pages/LectureList';
import Dashboard from './components/lectures/pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={LectureList} />
        <Route path='/dashboard/:id' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
