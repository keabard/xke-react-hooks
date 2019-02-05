/*This hook makes it super easy to utilize media queries in your component logic. In our example
 below we render a different number of columns depending on which media query matches the current
 screen width, and then distribute images amongst the columns in a way that limits column height
 difference (we don't want one column way longer than the rest).

You could create a hook that directly
 measures screen width instead of using media queries, but this method is nice because it makes it easy
 to share media queries between JS and your stylesheet. See it in action in the CodeSandbox Demo.*/

import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const columnCount = useMedia(
    // Media queries
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );

  // Create array of column heights (start at 0)
  let columnHeights = new Array(columnCount).fill(0);

  // Create array of arrays that will hold each column's items
  let columns = new Array(columnCount).fill().map(() => []);

  data.forEach(item => {
    // Get index of shortest column
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // Add item
    columns[shortColumnIndex].push(item);
    // Update height
    columnHeights[shortColumnIndex] += item.height;
  });

  // Render columns and items
  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map(column => (
          <div className="column">
            {column.map(item => (
              <div
                className="image-container"
                style={{
                  // Size image container to aspect ratio of image
                  paddingTop: (item.height / item.width) * 100 + '%'
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook
function useMedia(queries, values, defaultValue) {
  // State update function
  const match = () => {
    // Get first media query that matches
    const query = queries.findIndex(q => matchMedia(q).matches);
    // Return related value or defaultValue if none
    return values[query] || defaultValue;
  };
  
  // State and setter for current value
  const [value, set] = useState(match);

  useEffect(() => {
    // Update state on window resize
    // Usage of match function defined outside of useEffect ...
    // ... ensures that it has current values of arguments.
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handler);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return value;
}
