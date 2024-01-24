import { Link } from "react-router-dom";

function Breadcumb() {
    return (
        <section className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Office Room</Link>
          </li>
          <li>
            <Link to="/" aria-label="current-page">Details</Link>
          </li>
        </ul>
      </div>
    </section>
    );
};

export default Breadcumb;