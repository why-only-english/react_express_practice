export function MyButton(props) {
  return (
    <button
      style={{
        backgroundColor: props.color,
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        marginTop: "20px",
      }}
      // onClick={() => window.location.href = props.clickUrl}
      onClick={() => window.open(props.clickUrl, "_blank")}
    >
      {props.title}
    </button>
  );
}

export default MyButton;
