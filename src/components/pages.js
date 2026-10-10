// props.page = current page number
// props.totalpages = how many pages in total
// props.changepage = function that changes the page
function Pages(props) {
  // only one page? show nothing
  if (props.totalpages <= 1) {
    return null;
  }

  // make a list of numbers like [1, 2, 3, 4]
  const numbers = [];
  for (let i = 1; i <= props.totalpages; i++) {
    numbers.push(i);
  }

  return (
    <div className="pagination-box">
      {numbers.map((number) => {
        // the current page gets the class "active" (black circle)
        let classname = "";
        if (number === props.page) {
          classname = "active";
        }

        return (
          <button
            key={number}
            className={classname}
            onClick={() => props.changepage(number)}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default Pages;