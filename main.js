
import { ToyReact, Component } from './ToyReact';

class MyComponent extends Component {
  render () {
    return <div>Cool React</div>
  }

}

let my = <MyComponent name="mars" id = "mycomponent"/>
// console.log(my)

ToyReact.render(
  my,
  document.body
)