import { useContext } from "react";
import uploadContext from "../contextAPI/context";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import "./upload.css";

const HomePage = () => {
  const { data, logout, DeleteData, Update, setId, setUpdateName } =
    useContext(uploadContext);
  const [modal, setmodal] = useState(false);

  console.log(data, "data");
  return (
    <div id="main-home-div">
      <header id="header">
        <h2>File Upload App</h2>
        <h4 onClick={logout} style={{ textAlign: "right", marginRight: "10%" }}>
          Logout
        </h4>
        <Link to="/upload">
          <button>Add more</button>
        </Link>
      </header>

      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader>update</ModalHeader>
        <ModalBody>
          <fieldset>
            <div>
              <label>Update Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setUpdateName(e.target.value);
                }}
              />
            </div>
            <div id="sub-cancel">
              <button
                className="cancel"
                onClick={() => {
                  setmodal(!modal);
                }}
              >
                Cancel
              </button>
              <button
                className="submit"
                onClick={() => {
                  Update();
                  setmodal(!modal);
                }}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </ModalBody>
      </Modal>

      <main>
        {data.map((items, i) => {
          return (
            <div id="img-div">
              <div className="div1">
                <h3>{items.name}</h3>
                <span>
                  <button
                    id="edit"
                    onClick={() => {
                      setId(items._id);
                      setmodal(true);
                    }}
                    className="btn mt-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => DeleteData(items._id)}
                    id="delete"
                    className="btn mt-3"
                  >
                    Delete
                  </button>
                </span>
              </div>
              <div className="div2">
                <img src={items.file} alt="123" />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
export default HomePage;
