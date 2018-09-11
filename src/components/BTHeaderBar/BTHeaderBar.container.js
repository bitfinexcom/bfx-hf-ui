import { connect } from 'react-redux'
import BTHeaderBar from './BTHeaderBar'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const { markets = {} } = data
  const { symbols = [], tfs = [] } = markets

  return {
    symbols,
    tfs
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(BTHeaderBar)
