import { connect } from 'react-redux'
import APIKeyActions from '../../redux/actions/apiKey'
import WSBFXActions from '../../redux/actions/ws-bfx'
import HFUI from './HFUI'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const { apiKey = {} } = data

  return {
    apiKeyCombo: apiKey,
  }
}

const mapDispatchToProps = dispatch => ({
  loadAPIKey: () => {
    dispatch(APIKeyActions.load())
  },

  submitAPIKey: ({ key, secret } = {}) => {
    dispatch(APIKeyActions.submit({ key, secret }))
  },

  cycleBFXConnection: () => {
    dispatch(WSBFXActions.cycleConnection())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HFUI)
