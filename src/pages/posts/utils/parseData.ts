export const parseData = (json) => {
  const data = JSON.parse(json)

  return data.root.children
}