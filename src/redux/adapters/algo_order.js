import {
  TWAP,
  Iceberg,
  PingPong,
  AccumulateDistribute,
} from 'bfx-hf-algo'

const knownAOs = [TWAP, Iceberg, PingPong, AccumulateDistribute]

export default (ao) => {
  const [gid, algoID, active, state, createdAt] = ao
  const aoDef = knownAOs.find(kao => kao.id === algoID)
  const { name } = aoDef
  const label = aoDef
    ? aoDef.meta.genOrderLabel(state)
    : algoID

  const { args = {} } = state
  const { symbol } = args

  return {
    gid,
    algoID,
    active,
    createdAt,
    symbol,
    name,
    label,
  }
}
