import React from "react";
import db from "../../db/firestore";
import ListItem from "./ListItem";
const TodoList = () => {
  const formRef = React.useRef();
  const [cafeDatas, setCafeDatas] = React.useState([]);

  const watchTodo = () => {
    db.collection("cafes")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
            console.log(change.doc.id);
            setCafeDatas((prevState) => [
              ...prevState,
              {
                ...change.doc.data(),
                id: change.doc.id, //document id
              },
            ]);
          }
        });
      });
  };
  const getTodo = () => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status_code === 1) {
          setCafeDatas(json.results);
        }
      });
  };

  React.useEffect(() => {
    getTodo();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    const { name, email, city } = formRef.current;
    if (formRef.current.name.value === "") return false;
    const isDuplicateName = cafeDatas.some(
      (data) =>
        data.name.toLowerCase().trim() ===
        formRef.current.name.value.toLowerCase().trim()
    );
    if (!isDuplicateName) {
      fetch(
        `/api/list?city=${formRef.current.select.value}&name=${formRef.current.name.value}&email=${formRef.current.email.value}`,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status_code === 1) {
            getTodo();
          }
        });
      formRef.current.name.value = "";
      formRef.current.select.value = "Taiwan";
    } else {
      console.log("帳號已存在");
    }
  };

  const deleteTodo = (id) => {
    fetch(`/api/list?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status_code === 1) {
          getTodo();
        }
      });
  };

  const updateTodo = (id, data) => {
    //   db.collection("cafes").doc(id).update(data);
    fetch(
      `/api/list?id=${id}&name=${data.name}&email=${data.email}&city=${data.city}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status_code === 1) {
          getTodo();
        }
      });
  };
  return (
    <div>
      <form onSubmit={addTodo} ref={formRef}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="email" placeholder="email" />
        <select name="select">
          <option selected>Taiwan</option>
          <option>America</option>
        </select>
        <button type="submit">送出</button>
      </form>
      <ul>
        {cafeDatas &&
          cafeDatas.map((data, dataIdx) => {
            return (
              <ListItem
                data={data}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            );
          })}
      </ul>
    </div>
  );
};
export default TodoList;
