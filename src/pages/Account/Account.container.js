import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import sha from 'sha.js'

import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getUser } from '../../redux/selectors/ws_dtc_server'
import Account from './Account'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },

  changePassword: (oldPassword, newPassword) => {
    const hashedOld = sha('sha256').update(oldPassword).digest('hex')
    const hashedNew = sha('sha256').update(newPassword).digest('hex')

    dispatch(WSDTCActions.send(['change_password', hashedOld, hashedNew]))
  },

  clearCredentials: (exID) => {
    dispatch(WSDTCActions.send(['api_credentials.clear', exID]))
  },

  onChangePlan: (productID) => {
    dispatch(WSDTCActions.send(['change_plan', productID]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
