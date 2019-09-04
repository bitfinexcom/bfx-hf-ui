import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getAuthConfigured } from '../../redux/selectors/ws'
import Authentication from './Authentication'

const mapStateToProps = (state = {}) => ({
  configured: getAuthConfigured(state),
})

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  onInit: (password) => {
    dispatch(WSActions.initAuth(password))
  },

  onUnlock: (password) => {
    dispatch(WSActions.auth(password))
  },

  onReset: () => {
    dispatch(WSActions.resetAuth())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
