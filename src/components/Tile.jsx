function Tile({ className, value, onClick, playerTurn }) {
  let hoverClass = null;
  
  value === null && playerTurn !== null
    ? (hoverClass = playerTurn.toLowerCase() + "-hover")
    : (hoverClass = null);

  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}
    </div>
  );
}

export default Tile;
