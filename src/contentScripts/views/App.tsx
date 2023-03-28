export const App = () => {
  useEffect(() => {
    window.ringsnode = {
      client: null,
      nodes: [1, 2],
    }
  }, [])
  return (
    <div className="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
      <div className="absolute right-0 bottom-0 flex w-5 h-5 rounded-full shadow cursor-pointer bg-blue-600" />
    </div>
  )
}
