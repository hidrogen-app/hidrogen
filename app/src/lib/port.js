export const getPort = () => {
  const port = process.env.PORT
  if (port) {
    const parsedPort = parseInt(port)
    return parsedPort
  } else {
    return 3030
  }
}