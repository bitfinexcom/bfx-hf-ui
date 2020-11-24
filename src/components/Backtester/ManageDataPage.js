import React from 'react'
import { Icon } from 'react-fa'
import Button from '../../ui/Button'
import './style.css'
import { propTypes, defaultProps } from './ManageDataPage.props'

export default class ManageDataPage extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  render() {
    const { data = [], closeManageData } = this.props
    if (!data.length) {
      return (
        <>
          There is no data yet.
        </>
      )
    }
    return (
      <>
        { data.map(date => (
          <div className='data-container'>
            <div className='date'>
              {date}
            </div>
            <div className='remove'>
              <Icon
                name='trash'
                role='button'
              />
            </div>
          </div>
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
