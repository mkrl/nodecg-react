import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class NCGStore extends EventEmitter {
  constructor() {
    super()
    this.replicants = {}
  }

  getReplicants() {
    return this.replicants
  }

  handleActions(action) {
    switch(action.type) {
      case "SET":
        this.replicants[action.name] = action.value
        this.emit("change")
        break
      default:
    }
  }

}

const replicate = (name) => {
  const replicant = nodecg.Replicant(name)
  NodeCG.waitForReplicants(replicant)
  .then(() => {
    console.log(replicant.name, replicant.value)
    replicant.on('change', (newValue) => {
      dispatcher.dispatch({
        type: "SET",
        name: replicant.name,
        value: newValue,
      })
    })
  })
}

replicate("test")

window.replicate = replicate
const nodeCGStore = new NCGStore()
dispatcher.register(nodeCGStore.handleActions.bind(nodeCGStore))
export default nodeCGStore