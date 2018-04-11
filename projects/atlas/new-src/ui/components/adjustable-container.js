import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { getLayout, setLayout } from '../../repository';
import config2Cell from '../utils/config-to-cell';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 30; // px
const marginX = 10; // px
const marginY = 10; // px

export default class AdjustableContainer extends Component {
  constructor(props) {
    super(props);

    /* eslint-disable immutable/no-mutation */
    this.state = {
      layout: [],
    };
    /* eslint-enable */
  }

  componentDidMount() {
    const childItems = _.isArray(this.props.childItems) ?
      this.props.childItems : [this.props.childItems];

    getLayout({
      storyId: this.props.id,
      sectionIds: _.map(childItems, 'key'),
    }).then((layout) => {
      this.setState({ layout });
    });
  }

  onLayoutChange(newLayout) {
    this.setState({ layout: newLayout });
  }

  saveLayout(newLayout) {
    setLayout({
      storyId: this.props.id,
      storyLayout: newLayout,
    });
  }

  render() {
    return (
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{ lg: this.state.layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={rowHeight}
        margin={[marginX, marginY]}
        onDrag={args => this.onLayoutChange(args)}
        onResize={args => this.onLayoutChange(args)}
        onDragStop={args => this.saveLayout(args)}
        onResizeStop={args => this.saveLayout(args)}
      >
        {_.map(this.props.childItems, item => config2Cell(item))}
      </ResponsiveReactGridLayout>
    );
  }
}

AdjustableContainer.propTypes = {
  id: PropTypes.string.isRequired,
  childItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

AdjustableContainer.defaultProps = {
  childItems: [],
};
