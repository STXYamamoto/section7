import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

//アロー関数に変更
//reactではclassでなくclassNameでクラスを適用する
export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //イベントが発生するとeventという引数がかえってくる
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    //スプレッド構文を利用(...で配列を取り出してtodoTextを追加する)
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("")
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //配列の特定の中身を削除する関数
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newInCompleteTodos = [...incompleteTodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];

    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5

  return (
    <>    
      {/* inputTodo.jsxへコンポーネント化 */}
      {/* <div className="input-area">
        <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div> */}
      {/* propsに必要な値、関数をセット */}
      <InputTodo 
        todoText={todoText} 
        onChange={onChangeTodoText} 
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />

      {isMaxLimitIncompleteTodos && (
        <p style={{color:"red"}}>
          登録できるのTODOは５個まで！
        </p>
      )}
      
      {/* IncompleteTodos.jsxへコンポーネント化 */}
      {/* <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => (
            //一意になるkeyを設定しないとエラーになる。
            //★keyにindexはNGだが、onclickDeleteにはなぜ使用できる？
            //return()は省略できる
//            return (
              <li key = {todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
//jsxのタグの中で{}の中身はjavascriptとして扱われる。
//<button onClick={onClickDelete(index)}>削除</button>だと関数が実行されてしまう。
//実行されないようアロー関数で設定する必要あり
            )
//       })}
//        一番外の{}はJavaScript記載用,内側の()はmap関数用
          )}
        </ul>
      </div> */}
      <IncompleteTodos 
        todos={incompleteTodos} 
        onClickComplete={onClickComplete} 
        onClickDelete={onClickDelete}
      />
      
      {/* CompleteTodos.jsxへコンポーネント化 */}
      {/* <div className="complete-area">
      <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => (
              <li key = {todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              </li>
          ))}
        </ul>
      </div> */}
      <CompleteTodos 
        todos={completeTodos} 
        onClick={onClickBack}
      />
    </>
  );
}
