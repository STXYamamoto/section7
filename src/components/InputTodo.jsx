//styles.cssから移動(JavaScript用に書き換える必要あり)
const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
}

export const InputTodo = (props) => {
  const {todoText, onChange, onClick, disabled} = props;
  return (
    // styleもコンポーネント単位にした方がメンテしやすい
    //  <div className="input-area">
     <div style={style}>
      <input 
        placeholder="TODOを入力" 
        value={todoText} 
        onChange={onChange}
        disabled={disabled}
      />
      <button 
        onClick={onClick}
        disabled={disabled}
        >追加
      </button>
    </div>
  );
};