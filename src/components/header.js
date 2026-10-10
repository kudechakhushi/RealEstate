// props.openform = function that opens the popup (comes from App.js)
function Header(props) {
  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <h1 className="logo">Dev </h1>

        <nav className="nav-links">
          <a href="#home">HOME</a>
          <a href="#listing">LISTING</a>
          <a href="#about">ABOUT US</a>
        </nav>

        <button className="header-btn" onClick={props.openform}>
          Contact
        </button>
      </div>
    </header>
  );
}

export default Header;