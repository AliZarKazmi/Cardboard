import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function List(Props) {
  const { header, items } = Props;
  const ref = useRef();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (show && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [show]);
  return (
    <>
      <button
        className="nav-link dropdown-toggle"
        aria-expanded={show ? "true" : "false"}
        onClick={() => setShow((prev) => !prev)}
      >
        {header}
      </button>
      <ul className="dropdown-menu" ref={ref}>
        {items.map((item, index) => {
          return (
            <li key={index} onClick={() => setShow(false)}>
              <Link className="dropdown-item" to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
        <li key='children'> {Props.children}</li>
      </ul>
    </>
  );
}

export default List;
