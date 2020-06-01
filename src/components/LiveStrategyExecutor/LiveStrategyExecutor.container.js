import { connect } from 'react-redux'

import LiveStrategyExecutor from './LiveStrategyExecutor'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({
  dsExecuteLiveStrategy: () => {
    // TODO execute
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStrategyExecutor)
