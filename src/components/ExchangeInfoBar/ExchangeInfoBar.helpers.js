const symbolToLabel = (symbol) => {
  return `${symbol.substring(1, 4)}/${symbol.substring(4)}`
}

export { symbolToLabel }
