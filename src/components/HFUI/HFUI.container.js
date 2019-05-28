import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import APIKeyActions from '../../redux/actions/apiKey'
import WSHFActions from '../../redux/actions/ws-hf-server'
import HFUI from './HFUI'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { dataHF = {} } = state
  const { apiKey = {} } = dataHF

  return {
    apiKeyCombo: apiKey,
  }
}

const mapDispatchToProps = dispatch => ({
  loadInitialSettings: () => {
    dispatch({ type: 'GET_SETTINGS' })
  },

  loadAPIKey: () => {
    dispatch(APIKeyActions.load())
  },

  submitAPIKey: ({ key, secret } = {}) => {
    dispatch(APIKeyActions.submit({ key, secret }))
  },

  cycleBFXConnection: () => {
    dispatch(WSHFActions.cycleConnection())
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HFUI))
