import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import hljs from 'highlight.js'

import { propTypes, defaultProps } from './Markdown.props'
import './style.css'

const md = new Remarkable({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks
  linkify: true, // autoconvert URL-like texts to links
  linkTarget: '', // set target to open link in
  typographer: false, // Enable some language-neutral replacements + quotes beautification
  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
        return ''
      }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {
      return ''
    }
  },
}).use(linkify)

export default class Panel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    text: '',
  }

  UNSAFE_componentWillMount() { // eslint-disable-line
    this.reload()
  }

  reload() {
    const { src, text } = this.props
    // only load from file if props.src is specified
    if (src) {
      fetch(src)
        .then(response => response.text())
        .then(t => this.setState({ text: t }))
    } else {
      this.setState({ text })
    }
  }

  render() {
    const { text } = this.state
    return (
      <Scrollbars
        renderTrackVertical={props => (
          <div {...props} className='hfui-scrollbars-track-vertical' />
        )}
        renderThumbVertical={props => (
          <div {...props} className='hfui-scrollbars-thumb-vertical' />
        )}
      >
        <div
          className='hfui-markdown__wrapper'
          dangerouslySetInnerHTML={{ __html: md.render(text) }}
        />
      </Scrollbars>
    )
  }
}
