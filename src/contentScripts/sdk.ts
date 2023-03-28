window.addEventListener('message', (e) => {
  console.log(e)
})

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
