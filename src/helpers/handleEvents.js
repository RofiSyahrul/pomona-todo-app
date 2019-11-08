export function handleChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}

export function handleSubmit(event, callback, ...args) {
  event.preventDefault();
  this.setState({loading: true}, () => {
    callback(...args, () => {
      this.setState({loading: false})
    });
  });
}