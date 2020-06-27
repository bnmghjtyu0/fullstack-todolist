import React from "react";
const ListItem = ({ data, deleteTodo, updateTodo }) => {
  const [edit, setEdit] = React.useState(false);
  const [modify, setModify] = React.useState(data);
  return (
    <li>
      <span>{data.name}</span>-<span>{data.city}</span>-
      <span>
        {edit ? (
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setModify({ ...modify, email: e.target.value });
            }}
          />
        ) : (
          data.email
        )}
      </span>
      <button
        onClick={() => {
          setEdit(true);
        }}
      >
        編輯
      </button>
      <button
        onClick={() => {
          updateTodo(data.id, modify);
          setEdit(false);
        }}
      >
        確定
      </button>
      <button
        onClick={() => {
          deleteTodo(data.id);
        }}
      >
        x
      </button>
    </li>
  );
};

export default ListItem;
