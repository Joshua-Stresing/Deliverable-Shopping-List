import React, { useReducer, useState } from 'react';

const startingItem = [{ id: 0, text: 'Finish your app!', done: false }];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROCERY':
      return [
        { id: state.length, text: action.payload.text, done: false },
        ...state,
      ];

    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload.id);

    case 'EDIT':
      return state.map((item) => {
        if (action.payload.id === item.id) {
          return action.payload;
          // done: action.payload.done,
        }
        return item;
      });

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

  const editItem = (item) => {
    dispatchList({ type: 'EDIT', payload: item });
  };

  const deleteItem = (id) => {
    console.log(`delete item ${id}`);
    dispatchList({ type: 'REMOVE', payload: { id } });
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
            {!item.editing ? (
              <>
                {item.text}
                <button onClick={() => editItem({ ...item, editing: true })}>
                  Edit
                </button>
              </>
            ) : (
              <>
                <input
                  name="grocery"
                  placeholder="Enter Item Here."
                  type="text"
                  value={item.text}
                  onChange={(e) => editItem({ ...item, text: e.target.value })}
                />
                <button onClick={() => editItem({ ...item, editing: false })}>
                  Save
                </button>
              </>
            )}

            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </article>
        ))}
      </div>
    </>
  );
}
