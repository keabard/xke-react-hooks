/*This hook makes it easy to dynamically change the appearance of your app using CSS variables. You
 simply pass in an object containing key/value pairs of the CSS variables you'd like to update and
 the hook updates each variable in the document's root element. This is useful in situations where
 you can't define styles inline (no psudeoclass support) and there are too many style permutations to
 include each theme in your stylesheet (such as a web app that lets users customize the look of
 their profile). It's worth noting that many css-in-js libraries support dynamic styles out of the box,
 but it's interesting to experiment with how this can be done with just CSS variables and a React
 Hook. The example below is intentionally very simple, but you could imagine the theme object being
 stored in state or fetched from an API. Be sure to check out the CodeSandbox demo for a more
 interesting example and to see the accompanying stylesheet.*/

import React from 'react';
import { useLayoutEffect } from 'react';
import './styles.scss'; // -> https://codesandbox.io/s/15mko9187

// Usage
const theme = {
  'button-padding': '16px',
  'button-font-size': '14px',
  'button-border-radius': '4px',
  'button-border': 'none',
  'button-color': '#FFF',
  'button-background': '#6772e5',
  'button-hover-border': 'none',
  'button-hover-color': '#FFF'
};

function App() {
  useTheme(theme);

  return (
    <div>
      <button className="button">Button</button>
    </div>
  );
}

// Hook
function useTheme(theme) {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
}