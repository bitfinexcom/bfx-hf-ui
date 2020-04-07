
export default class Test {
  static fireEvent(component, event, data) {
    component.simulate(`${event}`, data)
  }
}
