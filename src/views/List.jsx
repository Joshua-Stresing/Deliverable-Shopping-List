import React, { useReducer, useState } from 'react';

const startingItem = [{ id: 0, text: 'Finish your app!', done: false }];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROCERY': {
      const newState = [
        { id: state.length, text: action.payload.text, done: false },
        ...state,
      ];
      console.log(newState);
      return newState;
    }
    default:
      throw new Error('Action type ${action.type} is not supported');
  }
};

export default function List() {
  const [list, dispatchList] = useReducer(listReducer, startingItem);
  const [grocery, setGrocery] = useState('');
  //^This only works for the input on this page^
  const addItem = (e) => {
    e.preventDefault();
    dispatchList({ type: 'ADD_GROCERY', payload: { text: grocery } });
    //^Dont forget that the state is held in memory and we can do what we want with it. We just need to supply the action^Also type is just a descriptor
  };

  return (
    <>
      <label>
        <input
          name="grocery"
          placeholder="Enter Item Here."
          type="text"
          value={grocery}
          onChange={(e) => setGrocery(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </label>
      <div>
        {list.map((item) => (
          <article key={item.id}>
            {item.text}
            <button>Edit</button>
            <button>Delete</button>
          </article>
        ))}
      </div>
    </>
  );
}
