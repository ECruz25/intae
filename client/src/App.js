import React, { useState } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import 'react-quill/dist/quill.snow.css';
// import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import withAuth from './Components/HOC/withAuth';
import NavBar from './Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleSectionPage from './Components/SingleSectionPage';
import CreatePage from './Components/CreatePage';

function App() {
  const [page, setPage] = useState('Home');
  return (
    <div className="App">
      <Router>
        <NavBar
          setPage={pageName => {
            setPage(pageName);
          }}
          page={page}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route
            path="/createPage/:categoryId"
            component={withAuth(CreatePage)}
          />
          <Route path={`/:name/:id`} exact component={SingleSectionPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
