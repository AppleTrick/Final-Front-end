import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

import Header from "./components/Header";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import MapService from "./pages/Map/MapService";
import Payment from "./pages/Iamport/Payment";

import Calendar from "./pages/Calendar/Calendar";
import Login from "./pages/login/Login";

import "./index.css";
import StudyForm from "./pages/StudyForm";
import MyStudy from "./pages/MyStudy";

import { signIn } from "./pages/login/Auth";

export default function App() {
<<<<<<< HEAD
  const [name, setName] = useState("");
=======

>>>>>>> changhee
  const [email, setEmail] = useState("");
  const [userValue, setUserValue] = useState(null);
  const authenticated = userValue != null;
  const logout = () => setUserValue(null);

  //로그인한 유저정보를 가지고 온다 . name과 email로 가지고 오게 된다.
  const signUserIn = (email) => {
    setEmail(email);
<<<<<<< HEAD
    return setUserValue(signIn(name, email));
  };
=======
    return setUserValue(signIn(email));
  }
>>>>>>> changhee

  return (
    <Router>
      <div>
        {/* 로그인 했을경우 Header가 보여지게 된다. */}
        {authenticated && <Header logout={logout} />}

        {/* 로그인 했을 경우 */}
        {authenticated && (
          <>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/feed" component={Feed} />
              <Route exact path="/map" component={MapService} />
              <Route path="/mystudy" component={MyStudy} />
              <Route path="/study/generate" component={StudyForm} />
              <Route path="*" render={() => <div>404</div>} />
            </Switch>
          </>
        )}

        {/* 로그인하지 못했을 경우 */}
        {!authenticated && (
          <>
            <Route path="/" render={() => <Login signUserIn={signUserIn} />} />
          </>
        )}
      </div>
    </Router>
  );
}
