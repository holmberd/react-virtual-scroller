# react-virtual-scroller

`<VirtualScroller>` is a high performant React component that provides a way to render a large number of elements in a scrollable list without negatively affecting overall UI performance. It achives this by only rendering the elements that are currently visible in its "viewport" and virtualizes elements not currently visible.

## Install

The `<VirtualScroller>` web component can be installed from [NPM](https://npmjs.org):

```sh
# NPM
npm install @holmberd/react-virtual-scroller

# Yarn
yarn add @holmberd/react-virtual-scroller

```

## Usage
```jsx
import React from 'react';
import VirtualScroller from './react-virtual-scroller';

const getItemLength = (index) => index % 2 === 0 ? 50 : 100;

const listItems = Array.from(Array(1000).keys()).map((index) => ({
  id: index,
  height: getItemLength(index),
  width: getItemLength(index),
}));

const handleVisibleRangeChange = ({ startIndex, stopIndex, offsetIndex }) => {
  console.log(`Visible range: ${startIndex - offsetIndex} - ${stopIndex + offsetIndex}`);
};

export function VerticalList() {
  return (
    <VirtualScroller
      width={402}
      height={402}
      getItemLength={getItemLength}
      offsetVisibleIndex={2} // Overscan with 2 above & below visible index.
      enableResizeObserver={true}
      onVisibleRangeChange={handleVisibleRangeChange}
    >
      {listItems.map((item) =>
        <div
          key={item.id}
          style={{
            height: item.height,
            borderBottom: '1px solid black',
          }}
        >
          {item.id}
        </div>
      )}
    </VirtualScroller>
  );
}
```

## API

### Props

#### `width = 0`
Set the width of the VirtualScroller list.

#### `height = 0`
Set the height of the VirtualScroller list.
#### `getItemLength = (index: number) => number`
Callback function to calculate and return the length(height or width) of each item by index.

#### `offsetVisibleIndex = 0`
Number of extra items (overscan) to be rendered before/after the visible range.

#### `layout = 'vertical'`
Set whether to use `vertical` or `horizontal` layout virtualization.

#### `enableResizeObserver = false`
Set wether to update visible item indexes on element resize.

#### `disableVirtualization = false`
Set to disable virtualization (the `onVisibleRangeChange` callback will still be called).

### Methods

### `resetOnIndex(index: number = 0, shouldUpdate: boolean = true): void`
Rebuilds the items cached scrollOffset index on and after the specified index when called. Useful when the size of an item changes in your list, e.g. expanded/collapsed. By default calling this method will trigger an update, use `shouldUpdate` to override this behaviour.

### `scrollToItem(index: number): void`
Scrolls to the specified item index when called. (The item aligns to the beginning of the list).

## Browser Support
`<VirtualScroller>` supports `es2020` JavaScript features for desktop and
mobile browsers and builds upon standard web platform APIs so that the performance,
capabilities and compatibility of the library get better as the web evolves.