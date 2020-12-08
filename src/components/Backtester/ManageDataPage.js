import React from 'react'
import { Icon } from 'react-fa'
import { startCase as _startCase } from 'lodash'
import Button from '../../ui/Button'
import './style.css'
import { propTypes, defaultProps } from './ManageDataPage.props'

export default class ManageDataPage extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    idsToDelete: [],
  }

  constructor(props) {
    super(props)
    this.onRemove = this.onRemove.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  onRemove(id) { // eslint-disable-line
    const { idsToDelete } = this.state
    this.setState(() => ({
      idsToDelete: [
        ...idsToDelete,
        id.reverse().join('_'),
      ],
    }))
  }
  onSave() {
    const { closeManageData, removeCores } = this.props
    const { idsToDelete = [] } = this.state
    if (idsToDelete.length) {
      removeCores(idsToDelete)
    }
    closeManageData()
  }
  symbolToLabel(symbol) { //eslint-disable-line
    if (symbol.includes(':')) {
      let [base, quote] = symbol.split(':') //eslint-disable-line
      if (base.includes('t')) {
        base = base.substring(1, base.length)
      }
      return `${base}/${quote}`
    }
    return `${symbol.substring(1, 4)}/${symbol.substring(4)}`
  }
  render() {
    const { data = [], closeManageData } = this.props
    const { idsToDelete } = this.state
    const preparedData = data.map(d => d.split('_').reverse())
    if (!data.length || idsToDelete.length === data.length) {
      return (
        <>
          There is no data yet.
          <div className='btn-block'>
            <Button
              dark
              label={[
                <p key='text'>Go back</p>,
              ]}
              onClick={() => {
                closeManageData()
              }}
            />
            <Button
              green
              className='settings-save'
              onClick={() => this.onSave()}
              label={[
                <i key='icon' className='icon-save' />,
                <p key='text'>Save</p>,
              ]}
            />
          </div>
        </>
      )
    }
    return (
      <>
        { preparedData.map(d => (
          !idsToDelete.includes(d.reverse().join('_')) && (
          <div className='data-container'>
            <div className='date'>
              {
                `${this.symbolToLabel(d[2])} ${_startCase(d[1])} ${d[0]}`
              }
            </div>
            <div className='remove' id={d[0]} onClick={() => this.onRemove(d)}>
              <Icon
                name='trash'
                role='button'
                id={d[2]}
              />
            </div>
          </div>
          )
        ))}
        <div className='btn-block'>
          <Button
            dark
            label={[
              <p key='text'>Go back</p>,
            ]}
            onClick={() => {
              closeManageData()
            }}
          />
          <Button
            green
            className='settings-save'
            label={[
              <i key='icon' className='icon-save' />,
              <p key='text'>Save</p>,
            ]}
          />
        </div>
      </>
    )
  }
}
