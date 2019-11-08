export function handleChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}

export function handleSubmit(
  event,
  loadingState,
  callback = () => {},
  ...args
) {
  event.preventDefault();
  if (!loadingState) loadingState = "loading";
  this.setState({ [loadingState]: true }, () => {
    callback(...args, () => {
      this.setState({ [loadingState]: false });
    });
  });
}
