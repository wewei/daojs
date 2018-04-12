import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';

import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

export default class FlexBoxContainer extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          ...this.props.style,
        }}
      >
        <StoryboardContext.Consumer>
          { ({ agent }) => _.map(this.props.items, item => <Cell agent={agent} {...item} />) }
        </StoryboardContext.Consumer>
      </div>
    );
  }
}

FlexBoxContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.objectOf(any),
    PropTypes.string,
  ])),
  style: PropTypes.objectOf(any),
};

FlexBoxContainer.defaultProps = {
  items: [],
  style: {},
};