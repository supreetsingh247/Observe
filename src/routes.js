import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import * as cookie from 'js-cookie';
import AddStudent from './components/AddStudent';
import StudentInfo from './components/StudentInfo';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AddStudent} />
    <Route path="/students" component={StudentInfo} />
    <Route path="/editStudent/:studentId" component={AddStudent} />
  </Route>
);