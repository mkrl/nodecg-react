import React from "react"
import ReactDOM from "react-dom"
import NCGStore from './stores/NodecgStore'

class App extends React.Component {
  constructor() {
  super()
    this.state = {
      replicants: NCGStore.getReplicants(),
    }
  }

  componentDidMount() {
    NCGStore.on("change", () => {
      this.setState({
        replicants: NCGStore.getReplicants(),
      })
  })

  }

  render() {
    return <div>
      <div className="container">
        <h1>Farts</h1>
      </div>
    </div>
  }
}

const root = document.getElementById("app");

ReactDOM.render(<App/>, root)