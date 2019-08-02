import { connect } from 'react-redux'
import SettingsView from './SettingsView'
import APIKeyActions from '../../redux/actions/api-key'
import WSHFActions from '../../redux/actions/ws-hf-server'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { dataHF = {} } = state
  const { apiKey = {} } = dataHF
  const { key, secret } = apiKey


  return {
    apiKey,
  }
}

const mapDispatchToProps = dispatch => ({
  loadAPIKey: () => {
    dispatch(APIKeyActions.load())
  },

  submitAPIKey: ({ key, secret } = {}) => {
    dispatch(APIKeyActions.submit({ key, secret }))
  },

  updateAPIKey: ({ key, secret } = {}) => {
    dispatch(APIKeyActions.update({ key, secret }))
  },

  cycleBFXConnection: () => {
    dispatch(WSHFActions.cycleConnection())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
