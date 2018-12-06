/*This hook is part of the react-spring animation library which allows for highly performant
 physics-based animations. I try to avoid including dependencies in these recipes, but once in awhile I'm
 going to make an exception for hooks that expose the functionality of really useful libraries. One
 nice thing about react-spring is that it allows you to  completely skip the React render cycle when
 applying animations, often giving a pretty substantial performance boost. In our recipe below we
 render a row of cards and apply a springy animation effect related to the mouse position over any
 given card. To make this work we call the useSpring hook with an array of values we want to animate,
 render an animated.div component (exported by react-spring), get the mouse position over a card
 with the onMouseMove event, then call setAnimatedProps (function returned by the hook) to update that
 set of values based on the mouse position. Read through the comments in the recipe below for more
 details or jump right over to the CodeSandbox demo. I liked this effect so much I ended up using it
 on my startup's landing page 😎*/

import React from 'react';
import { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

// Displays a row of cards
// Usage of hook is within <Card> component below
function App() {
  const cards=[
    {title: 'Spider-Man', description: 'Spidey', image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b/standard_amazing.jpg'}
  ]
  return (
    <div className="container">
      <div className="row">
        {cards.map((card, i) => (
          <div className="column">
            <Card>
              <div className="card-title">{card.title}</div>
              <div className="card-body">{card.description}</div>
              <img className="card-image" src={card.image} alt="card" />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Card({ children }) {
  // We add this ref to card element and use in onMouseMove event ...
  // ... to get element's offset and dimensions.
  const ref = useRef();
  
  // Keep track of whether card is hovered so we can increment ...
  // ... zIndex to ensure it shows up above other cards when animation causes overlap.
  const [isHovered, setHovered] = useState(false);
  
  // The useSpring hook
  const [animatedProps, setAnimatedProps] = useSpring({
    // Array containing [rotateX, rotateY, and scale] values.
    // We store under a single key (xys) instead of separate keys ...
    // ... so that we can use animatedProps.xys.interpolate() to ...
    // ... easily generate the css transform value below.
    xys: [0, 0, 1],
    // Setup physics
    config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
  });

  return (
    <animated.div
      ref={ref}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        // Get mouse x position within card
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));

        // Get mouse y position within card
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));

        // Set animated values based on mouse position and card dimensions
        const dampen = 50; // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07 // Scale
        ];
        
        // Update values to animate to
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setHovered(false);
        // Set xys back to original
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        // If hovered we want it to overlap other cards when it scales up
        zIndex: isHovered ? 2 : 1,
        // Interpolate function to handle css changes
        transform: animatedProps.xys.interpolate(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        )
      }}
    >
      {children}
    </animated.div>
  );
}