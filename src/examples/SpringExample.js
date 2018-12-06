import React from 'react';
import Card from '../hooks/useSpring';

// Displays a row of cards
// Usage of hook is within <Card> component below
export default function App() {
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
