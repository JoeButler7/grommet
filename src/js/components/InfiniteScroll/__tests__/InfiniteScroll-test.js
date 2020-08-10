import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Box, Grommet, Grid } from '../..';
import { InfiniteScroll } from '..';

describe('InfiniteScroll', () => {
  const items = [];
  while (items.length < 4) items.push(items.length);

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

  test('Single Column', () => {
    const { container } = render(
      <Grommet>
        <Box direction="column">
          <InfiniteScroll items={items} step={10} replace>
            {(item, index) => <div key={index}>{item}</div>}
          </InfiniteScroll>
        </Box>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Multiple Columns', () => {
    const { container } = render(
      <Grommet>
        <Grid columns="xsmall" rows="small">
          <InfiniteScroll items={items} step={10}>
            {(item, index) => <div key={index}>{item}</div>}
          </InfiniteScroll>
        </Grid>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
