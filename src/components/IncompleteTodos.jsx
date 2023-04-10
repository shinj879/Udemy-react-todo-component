import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          /**useStateのデフォルト値を繰り返して処理している ループさせる処理はkeyを書く。*/
          // map()の第二引数を設定してあげると、配列のインデックス番号（配列の順番。０からスタートする）が０から順番に入ってくる。
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>　
              {/**onClickDelete(index)だけだと、ここで関数が実行されてしまうので（なぜこの時点で実行されるのかは分からない。onClickを設定したのだから、クリックしたときに実行されるのでは？）、 アロー関数にしてあげる。*/}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
