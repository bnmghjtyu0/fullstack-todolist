import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import TodoList from "./pages/TodoList";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <TodoList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
