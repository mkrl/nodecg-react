import React from "react"
import ReactDOM from "react-dom"
import NCGStore from './stores/NodecgStore'
import { replicate } from './stores/NodecgStore'

class App extends React.Component {
  constructor() {
  super()
    this.state = {
      replicants: NCGStore.getReplicants(),
    }
  }

  componentDidMount() {
    // Subscribing to replicant changes
    replicate("timestamp")
    replicate("name")
    // We keep all our subscribed replicants in a single "replicants" object
    NCGStore.on("change", () => {
      this.setState({
        replicants: NCGStore.getReplicants(),
      })
    })
  }

  render() {
    const lastStamp = String(new Date(this.state.replicants.timestamp))
    return (
      <div>
        <div className="container">
          <h1>Hello, {this.state.replicants.name}!</h1>
          <p>The last time someone pressed the button was {lastStamp}</p>
        </div>
      </div>
    )
  }
}

const root = document.getElementById("app")
ReactDOM.render(<App/>, root)