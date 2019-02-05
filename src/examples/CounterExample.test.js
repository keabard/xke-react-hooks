import React from 'react';
import {mount} from 'enzyme'
import Counter from './CounterExample';

it('increments the count', () => {
  const wrapper = mount(<Counter />);
  const button = wrapper.find('button');
  expect(button.text()).toBe('0')
  button.simulate('click');
  expect(button.text()).toBe('1');
  wrapper.unmount();
});

it('reads and updates localStorage', () => {
  window.localStorage.setItem('count', 3);
  const wrapper = mount(<Counter />);
  const button = wrapper.find('button');
  expect(button.text()).toBe('3')
  button.simulate('click');
  expect(button.text()).toBe('4')
});
