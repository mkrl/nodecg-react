import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

/* 
    This store is used for piping replicant values directly into your component state.
    By default, this store is used to return all replicant values you are subscribed to as a signle "replicants" object.
    You can change it to your liking.
*/ 

class NCGStore extends EventEmitter {
  constructor() {
    super()
    // Default values that will be overwritten on replicant declaration
    // They are not actually nessesary, they are just here for the sake of not handling 'undefined' at the component mount
    this.replicants = {}
  }
  getReplicants() {
    return this.replicants
  }
  handleActions(action) {
    if (action.type === "SET_REPLICANT") {
      this.replicants[action.name] = action.value
      this.emit("change")
    }
  }
}


// Going slightly against the pattern, but dispatching events
// in this store kind of makes sense since we only, in fact, have a single "setter" action that will bind our state to corresponding
// replicant value
const replicate = (name) => {
  const replicant = nodecg.Replicant(name)
  NodeCG.waitForReplicants(replicant)
  .then(() => {
    replicant.on('change', (newValue) => {
      dispatcher.dispatch({
        type: "SET_REPLICANT",
        name: replicant.name,
        value: newValue,
      })
    })
  })
}

const nodeCGStore = new NCGStore()
dispatcher.register(nodeCGStore.handleActions.bind(nodeCGStore))
export default nodeCGStore
export { replicate }