import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const backUrl = "http://157.253.162.69:3001";

  useEffect(() => {
    fetch(`/auth/getUser`)
      .then(res => res.json())
      .then(_user => {
        console.log("user", _user);

        if (_user) setUser(_user);
      });
  }, []); // Run only once

  return (
    <div className="App">
      <h1>Slack react</h1>

      {user ? (
        <div>Welcome ${user.name}</div>
      ) : (
        <a href={`${backUrl}/auth/slack`}>Please log in</a>
      )}
    </div>
  );
}

export default App;
