window.ringsnode = {
  emit: (message: string) => {
    window.postMessage(
      {
        type: 'inject-rings',
        message,
      },
      '*'
    )
  },
}
