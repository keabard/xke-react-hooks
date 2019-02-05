/*Sometimes you want to prevent your users from being able to scroll the body of your page while a
 particular component is absolutely positioned over your page (think modal or full-screen mobile
 menu). It can be confusing to see the background content scroll underneath a modal, especially if you
 intended to scroll an area within the modal. Well, this hook solves that! Simply call the
 useLockBodyScroll hook in any component and body scrolling will be locked until that component unmounts. See
 it in action in the CodeSandbox Demo.*/

import React from 'react';
import { useState, useLayoutEffect } from 'react';

// Usage
function App(){
  // State for our modal
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function Modal({ title, content, onClose }){
  // Call hook to lock body scroll
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

// Hook
function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => document.body.style.overflow = 'visible';
   }, []); // Empty array ensures effect is only run on mount and unmount
}