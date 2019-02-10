/*This hook makes it easy to add a "dark mode" toggle to your website. Essentially all it does is
 control whether your body element has the .dark-mode className and gives you some useful methods
 (enable, disable, and toggle) that you can pass to the button or component that triggers the change.
 See it in action in the CodeSandbox Demo.

I've kept this example as simple as possible, but if
 you're looking for something more configurable check out this use-dark-mode hook on Github (which
 inspired this post). If you look at their hook code you can see how they've moved the useEffect logic
 out into its the parent hook's scope so that values can be read from a configuration object.

Update:
 As Dan Abramov mentioned on Twitter, it would make much more sense for this hook to utilize the
 prefers-color-scheme media query and to persist to localstorage. I'll be posting an updated version
 of this hook soon.*/

import React from 'react';
// Usage
function App() {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <div className="navbar">
        <Toggle darkMode={darkMode} />
      </div>
      <Content />
    </div>
  );
}

// Hook
const className = 'dark-mode';
const element = global.document.body;

function useDarkMode(initialValue = false){
  // Enabled state for dark mode
  const [value, setDarkMode] = useState(initialValue);

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      if (value) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [value] // Only re-call effect when value changes
  );

  // Return object containing value and handy methods for changing value
  return {
    value,
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
    toggle: () => setDarkMode(current => !current)
  };

  // Alternatively, we could return a [value, setter] array (like useState) ...
  // ... if we don't care about having enable/disable/toggle methods.
  //return [ value, setDarkMode ];
};