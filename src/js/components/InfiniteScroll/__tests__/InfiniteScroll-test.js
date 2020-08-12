import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet, Image, Box } from '../..';
import { InfiniteScroll } from '..';

describe('InfiniteScroll', () => {
  const items = [];
  while (items.length < 4) items.push(items.length);
  const simpleItems = value =>
    Array(value)
      .fill()
      .map((_, i) => `item ${i + 1}`);

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll />
        <InfiniteScroll items={items}>
          {(item, index, ref) => (
            <div ref={ref} key={index}>
              {item}
            </div>
          )}
        </InfiniteScroll>
        <InfiniteScroll items={items}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('step', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={items} step={2}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('show', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={items} step={2} show={3}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renderMarker', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={items}
          step={2}
          renderMarker={m => <div>{m}</div>}
        >
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('replace', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={items} step={2} replace>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('mixed items', () => {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod temporincididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.`;
    const mixedItems = [];
    for (let i = 0; i < 1000; i += 1) {
      switch (i % 5) {
        case 0:
          mixedItems.push(<Box>Hello World</Box>);
          break;
        case 1:
          mixedItems.push(`This is a string at index ${i}`);
          break;
        case 2:
          mixedItems.push(
            <Image
              a11yTitle="Gremlin"
              src="https://v2.grommet.io/img/stak-hurrah.svg"
            />,
          );
          break;
        case 3:
          switch (i % 4) {
            case 0:
              mixedItems.push(lorem);
              break;
            case 1:
              mixedItems.push(lorem.slice(140));
              break;
            case 2:
              mixedItems.push(lorem + lorem);
              break;
            case 3:
              mixedItems.push(lorem.slice(Math.random()));
              break;
            default:
              break;
          }
          break;
        case 4:
          mixedItems.push(i * 186282);
          break;
        default:
          break;
      }
    }
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={mixedItems}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`Show item should be visible in window`, () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(300)}
          /* Uncomment the next 2 lines once fix for show is in place */
          // show={105}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );
    // item(104) = 'item 105' because indexing starts at 0.
    /* Delete the next 2 lines once fix for show is in place */
    const renderedItems = container.firstChild.children.item(10).outerHTML;
    expect(renderedItems).toContain('item 11');
    /* Uncomment the next 2 lines once fix for show is in place */
    // const renderedItems = container.firstChild.children.item(104).outerHTML;
    // expect(renderedItems).toContain('item 105');
  });
});

describe('Number of Items Rendered', () => {
  const simpleItems = value =>
    Array(value)
      .fill()
      .map((_, i) => `item ${i + 1}`);

  function createPageItems(allChildren) {
    const unfiltered = Array.from(allChildren);
    // Removing any children which are serving as refs
    return unfiltered.filter(childItem => childItem.outerHTML.includes('item'));
  }

  test(`Should render items equal to the length of
  step + 1 when step < items.length`, () => {
    const step = 50;
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(1000)}
          // show={117}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = step;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`Should render items equal to the length of
  step + 1 when step = array`, () => {
    const step = 200;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(200)} show={117} step={step}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = step;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`Should render items equal to the length of
  step when step > array`, () => {
    const numItems = 1000;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(numItems)} show={117} step={1050}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = numItems;
    expect(pageItems.length).toEqual(expectedItems);
  });
});
