import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import data from "./list/property-list-data.json";
import Header from "./components/header";
import Cards from "./components/cards";
import Pages from "./components/pages";
import ContactModal from "./components/contactmodal";
import Footer from "./components/footer";

function App() {
  // ===== 1. STATE (values that can change) =====
  // all properties come from the JSON file
  const [allProperties] = useState(data.properties);
  const [developer, setDeveloper] = useState("All"); // selected developer
  const [type, setType] = useState("All"); // selected type
  const [page, setPage] = useState(1); // current page number
  const [loading, setLoading] = useState(false); // show loading or not
  const [showForm, setShowForm] = useState(false); // show popup or not
  const [openMenu, setOpenMenu] = useState(""); // "developer", "type" or "" (all closed)

  // ===== 2. LOADING =====
  // runs again every time developer, type or page changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [developer, type, page]);

  // ===== 3. DROPDOWN OPTIONS (taken from the JSON) =====
  const developers = ["All"];
  const types = ["All"];

  for (let i = 0; i < allProperties.length; i++) {
    const oneDeveloper = allProperties[i].developer;
    const oneType = allProperties[i].property_type;

    // add only if it is not already in the list
    if (developers.includes(oneDeveloper) === false) {
      developers.push(oneDeveloper);
    }
    if (types.includes(oneType) === false) {
      types.push(oneType);
    }
  }

  // ===== 4. FILTER THE PROPERTIES =====
  const filtered = [];

  for (let i = 0; i < allProperties.length; i++) {
    const property = allProperties[i];

    let developerOk = false;
    if (developer === "All" || property.developer === developer) {
      developerOk = true;
    }

    let typeOk = false;
    if (type === "All" || property.property_type === type) {
      typeOk = true;
    }

    // keep the property only if both filters match
    if (developerOk === true && typeOk === true) {
      filtered.push(property);
    }
  }

  // ===== 5. PAGINATION (9 items per page) =====
  const perPage = 9;
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  // ===== 6. FUNCTIONS (called when user clicks something) =====
  // open or close one dropdown
  function toggleMenu(name) {
    if (openMenu === name) {
      setOpenMenu(""); // already open, so close it
    } else {
      setOpenMenu(name); // open this one (the other one closes)
    }
  }

  // user clicked a developer in the list
  function chooseDeveloper(name) {
    setDeveloper(name);
    setPage(1); // go back to page 1
    setOpenMenu(""); // close the list
  }

  // user clicked a type in the list
  function chooseType(name) {
    setType(name);
    setPage(1);
    setOpenMenu("");
  }

  function resetFilters() {
    setDeveloper("All");
    setType("All");
    setPage(1);
    setOpenMenu("");
  }

  function changePage(number) {
    setPage(number);
    window.scrollTo(0, 0); // go to top of the page
  }

  function openForm() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  // ===== 7. DECIDE WHAT TO SHOW IN THE LIST AREA =====
  let content;

  if (loading === true) {
    content = (
      <div className="loading-box">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  } else if (visible.length === 0) {
    content = <p className="empty-text">No properties found.</p>;
  } else {
    content = (
      <div className="card-grid">
        {visible.map((property) => (
          <Cards key={property.id} property={property} openform={openForm} />
        ))}
      </div>
    );
  }

  // ===== 8. WHAT SHOWS ON THE SCREEN =====
  return (
    <div>
      <Header openform={openForm} />

      <main className="page-container" id="listing">
        <section className="hero">
          <h2>Discover the Best Properties</h2>

          <div className="filters">
            <div className="filter-box">
              <label>DEVELOPER</label>
              <div className="dropdown">
                <button
                  className="dropdown-btn"
                  onClick={() => toggleMenu("developer")}
                >
                  <span>{developer}</span>
                  <span
                    className={openMenu === "developer" ? "arrow open" : "arrow"}
                  ></span>
                </button>

                {openMenu === "developer" && (
                  <div className="dropdown-list">
                    {developers.map((name) => (
                      <div
                        key={name}
                        className={
                          name === developer
                            ? "dropdown-item selected"
                            : "dropdown-item"
                        }
                        onClick={() => chooseDeveloper(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="filter-box">
              <label>TYPE</label>
              <div className="dropdown">
                <button
                  className="dropdown-btn"
                  onClick={() => toggleMenu("type")}
                >
                  <span>{type}</span>
                  <span
                    className={openMenu === "type" ? "arrow open" : "arrow"}
                  ></span>
                </button>

                {openMenu === "type" && (
                  <div className="dropdown-list">
                    {types.map((name) => (
                      <div
                        key={name}
                        className={
                          name === type
                            ? "dropdown-item selected"
                            : "dropdown-item"
                        }
                        onClick={() => chooseType(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="result-bar">
          <strong>{filtered.length} Properties Found</strong>
          <button className="reset-btn" onClick={resetFilters}>
            ⟳ Reset All Filters
          </button>
        </div>

        {content}

        <Pages page={page} totalpages={totalPages} changepage={changePage} />
      </main>

      <Footer />

     
      {showForm && <ContactModal closeform={closeForm} />}
    </div>
  );
}

export default App;