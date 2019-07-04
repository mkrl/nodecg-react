# nodecg-react

This is a [NodeCG](http://github.com/nodecg/nodecg) boilerplate bundle, powered by React, Parcel and a Flux-like pattern system for an easy state-to-[replicant](https://nodecg.com/NodeCG.html#Replicant) management.

It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.1.1`


## Getting started

Copy/clone the repo into your `bundles` folder that is located in the root folder of your NodeCG instance.
```bash
cd bundles
git clone git@github.com:mkrl/nodecg-react.git
cd nodecg-react
```
Install dependencies with `yarn` or `npm`
```bash
yarn
# or
npm i
```

Start up your NodeCG instance. 

In order to generate asset bundle from sources, run `npm start` at least once, as the repository does not initially come with pre-compiled assets.

## Developing

[Parcel](https://parceljs.org/) is a zero-configuration asset bundler. We use [Babel](https://babeljs.io/) to compile modern JavaScript with React into a single asset file that lives in our `/graphics` folder. 
In order to get started, run 
```bash
npm start
```
This will spin up Parcel watch mode. Open your app through a NodeCG "graphics" tab. You can now make desired changes to your source files under `/src` and they will automatically be hot-reloaded in your browser.

## Working with replicants and component state

The main purpose of this bundle is to create a reliable bridge between replicants and React state using Flux-like store.

Let's say, we have a basic class-based root component (this is exactly what this bundle comes with):

```js
...
class App extends React.Component {
  constructor() {
  super()
    this.state = {
      name: "Brandon"
    }
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}!</h1>
      </div>
    )
  }
}
...
```

Connecting to NodeCG replicants can then be done by importing `replicate` from our `stores/NodecgStore.js`. It is a function that takes a single argument - a replicant name.

After subscribing to a replicant, all you need to do is listen for changes on the store. At the very end our component should look something like this:

```js
...
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
    replicate("name")
    // We keep all our subscribed replicants in a single "replicants" object
    NCGStore.on("change", () => {
      this.setState({
        replicants: NCGStore.getReplicants(),
      })
    })
  }

  render() {
    return (
	    <div>
        <h1>Hello, {this.state.replicants.name}!</h1>
      </div>
    )
  }
}

...
```

Don't forget to define your replicants themselves, somewhere in your extension or a panel:
```js
// extension.js
module.exports = nodecg => {
	const nameReplicant = nodecg.Replicant('name', {defaultValue: "Brandon"})
}
```

Your component state will now be updated automatically whenever you initiate a replicant value change.

Bear in mind, if you don't declare your replicants before subscribing to them with `replicate()`, their initial value will be set to `undefined`, no matter what `defaultValue` is being passed to the declaring statement.

## Building

Even though running in a watch mode does produce working pieces of code, you are going to need a production build after you are done with your development process. Generating optimized and minified graphics is as simple as:

```bash
npm run build
```

## Contributing

Feel free to contribute, following this conventional and simple process:

 1. [Fork](https://github.com/mkrl/nodecg-react/fork)
 2. Create your feature branch (`git checkout -b new-cool-stuff`) 
 3. Commit (`git commit -am 'Add stuff'`) 
 4. Push to the branch (`git push origin new-cool-stuff`)
 5. Create a new Pull Request

Please note that this is still an early work-in-progress.