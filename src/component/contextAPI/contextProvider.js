import { useState } from "react";
import uploadContext from "./context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContextProvider = (props) => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [reg_data, setReg_data] = useState({ email: "", password: "" });
  const [confirm, setConfirm] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [data, setData] = useState([]);
  const [file, setfile] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const RegisterSubmit = () => {
    axios
      .post("https://fileuploading.onrender.com/register", reg_data)
      .then((res) => {
        if (res.status === 201) {
          alert(`registered successfully`);
          navigate("/");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const LoginUser = () => {
    axios
      .post("https://fileuploading.onrender.com/login", login)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.token);
          window.localStorage.setItem("token", res.data.token);
          FetchData();
          alert(`login successfully`);
        } else if (res.status === 401) {
          alert("password does not match");
        } else if (res.status === 404) {
          alert("user does not exist");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const FetchData = () => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .get("https://fileuploading.onrender.com/fileupload", config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.files);
          navigate("/home");
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Create = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("https://fileuploading.onrender.com/fileupload", formData, config)
      .then((res) => {
        console.log("ok");
        console.log(res.status);
        if (res.status === 201) {
          alert("data added");
          FetchData();
        } else {
          console.log("not ok");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Update = () => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .put(
        `https://fileuploading.onrender.com/fileupload/${id}`,
        { name: updateName },
        config
      )
      .then((res) => {
        if (res.status === 200) FetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const DeleteData = (itemId) => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .delete(`https://fileuploading.onrender.com/fileupload/${itemId}`, config)
      .then((res) => {
        if (res.status === 204) {
          FetchData();
          alert("data is deleted");
        } else {
          alert("invalid response");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <uploadContext.Provider
        value={{
          login,
          setLogin,
          setReg_data,
          data,
          reg_data,
          RegisterSubmit,
          confirm,
          setConfirm,
          LoginUser,
          logout,
          Create,
          FetchData,
          setfile,
          setName,
          DeleteData,
          Update,
          setId,
          setUpdateName,
        }}
      >
        {props.children}
      </uploadContext.Provider>
    </>
  );
};
export default ContextProvider;
