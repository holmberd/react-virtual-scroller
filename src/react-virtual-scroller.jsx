
/**
 * A React component for efficiently rendering lists with large number of elements.
 */

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VISIBLE_RANGE_CHANGE_EVENT, Virtualization } from '@holmberd/virtual-scroller';

VirtualScroller.propTypes = {
  children: PropTypes.element,
  forwardRef: PropTypes.any,
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  getItemLength: PropTypes.func.isRequired,
  offsetVisibleIndex: PropTypes.number,
  virtualization: PropTypes.oneOf(Object.values(Virtualization)),
  enableResizeObserver: PropTypes.bool,
  disableVirtualization: PropTypes.bool,
  onVisibleRangeChange: PropTypes.func,
};

function VirtualScroller({
  children,
  forwardRef,
  className,
  width,
  height,
  getItemLength,
  offsetVisibleIndex = 0,
  virtualization = Virtualization.VERTICAL,
  enableResizeObserver = false,
  disableVirtualization = false,
  onVisibleRangeChange,
}) {
  const [visibleIndex, setVisibleIndex] = useState([0, 0, 0]);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.addEventListener(
      VISIBLE_RANGE_CHANGE_EVENT,
      ({ detail: { startIndex, stopIndex, offsetIndex } }) => {
        setVisibleIndex([startIndex, stopIndex, offsetIndex]);
        onVisibleRangeChange && onVisibleRangeChange({ startIndex, stopIndex, offsetIndex });
      });
  }, []);

  useEffect(() => {
    if (!listRef?.current) {
      return;
    }

    listRef.current.enableResizeObserver = enableResizeObserver;
    listRef.current.init(React.Children.count(children), getItemLength, {
      virtualization,
      enableResizeObserver,
      disableVirtualization,
      offsetVisibleIndex,
    });

  }, [
    children,
    getItemLength,
    enableResizeObserver,
    virtualization,
    disableVirtualization,
    offsetVisibleIndex,
  ]);

  const [startIndex, stopIndex, offsetIndex] = visibleIndex;
  const offsetStartIndex = startIndex - offsetIndex;
  const offsetStopIndex = stopIndex + offsetIndex;

  return (
    <virtual-scroller
      className={className}
      ref={(node) => {
        if (forwardRef) {
          forwardRef.current = node;
        }
        listRef.current = node;
      }}
      style={{ width, height }}
    >
      {React.Children.toArray(children).slice(offsetStartIndex, offsetStopIndex + 1)}
    </virtual-scroller>
  );
}

export default React.forwardRef(function virtualScroller(props, ref) {
  return (<VirtualScroller {...props} forwardRef={ref} />);
});