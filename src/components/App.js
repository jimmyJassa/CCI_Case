import React from "react";
import StarWars from "./StarWars"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Vehicles</h2>
        <StarWars />
      </div>
    );
  }
}

export default App;