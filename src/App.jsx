import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //引数の「event」は「e」で表記することも多い。eventには、↓のonChagngeで変更があったときに入ってくるイベント。だが実際には、event.target.value に、inputで入力した内容が入ってくる。
  //ここでは、テキストボックスに入力された内容を、setTodoTextでtodoTextに入れている。

  const onClickAdd = () => {
    //追加ボタンを押したときに、テキストボックスの入力内容を未完了のTODOの欄に追加する処理
    if (todoText === "") return; //テキストボックスに何も入力しない状態で追加ボタンを押した場合、↓の処理が起きないようにしている。
    const newTodos = [...incompleteTodos, todoText];
    //...はスプレッド構文。もうすでにincompleteTodosに入っている要素も読み込む必要があるので、
    //新しい配列にスプレッド構文でその要素を展開し、テキストボックスで受け取った内容（todoText）もその配列の中に入れている。
    setIncompleteTodos(newTodos); //↑で作った配列をinCompleteTodosに改めて入れなおしている。
    setTodoText("");
  };

  const onClickDelete = (index) => {
    //indexは、incompleteTodos.map（）の第二引数で設定したindex（インデックス番号が入ってくるやつ）のこと。
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // .splice は、配列に使うメソッド。　第一引数に配列のインデックス（何番目か）を指定し、第二引数に削除したい個数を入れる。ちなみに第三引数もあり、新しく要素を追加する機能がある。
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {/**タグの中に＝でpropsを作れる。今回はそれぞれのpropsに上のほうで定義した関数を当ててる。
      disabledは条件を入れて、trueならpropsがわたるようにしている。なぜifやブーリアンを入れずに機能するかは謎。*/}
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodo５個までだよ～。消化しろ～。
        </p>
      )}
      {/** リスト内の要素が５つ以上なら、<p>を表示するという処理。*/}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
