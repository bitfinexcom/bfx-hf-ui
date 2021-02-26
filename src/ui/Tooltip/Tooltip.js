/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TooltipTrigger from 'react-popper-tooltip'

const Tooltip = (children, classes) => ({
  arrowRef,
  placement,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
}) => (
  <div
    {...getTooltipProps({
      ref: tooltipRef,
      style: { zIndex: 99999 },
      className: classNames('tooltip-container', classes),
    })}
  >
    <div
      {...getArrowProps({
        ref: arrowRef,
        className: 'tooltip-arrow',
        'data-placement': placement,
      })}
    />
    {children}
  </div>
)

const Trigger = ({
  children,
  tagName: TagName,
}) => ({ getTriggerProps, triggerRef }) => (
  <TagName
    {...getTriggerProps({
      ref: triggerRef,
      className: 'trigger',
    })}
  >
    {children}
  </TagName>
)

export default class TooltipWrapper extends React.PureComponent {
  static propTypes = {
    tagName: PropTypes.string,
    placement: PropTypes.string,
    tooltipContent: PropTypes.node,
    children: PropTypes.node.isRequired,
  }
  static defaultProps = {
    tagName: 'span',
    placement: 'auto',
    tooltipContent: null,
  }

  render() {
    const {
      tagName,
      children,
      placement,
      tooltipContent,
    } = this.props
    const modifiers = [{
      name: 'offset',
      enabled: true,
      options: { offset: [0, 6] },
    }]
    const tooltipClasses = '__react_component_tooltip __react-tooltip'

    if (!tooltipContent) {
      return children
    }

    return (
      <TooltipTrigger
        placement={placement}
        modifiers={modifiers}
        tooltip={Tooltip(tooltipContent, tooltipClasses)}
      >
        {Trigger({ children, tagName })}
      </TooltipTrigger>
    )
  }
}
