import "./mainpage.css";
import { useState, useRef, useEffect } from "react";

function MainPage(props) {
  const [nameValue, setNameValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [elements, setElements] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const fileInputRef = useRef();

  //* EDITING
  const [editMode, setEditMode] = useState(null);
  //* EDITING

  const [editModeGrade, setEditModeGrade] = useState(null);
  const [editName, setEditName] = useState("");

  //* EDITING
  const [editSpan, setEditSpan] = useState("");

  function handleNameInput(event) {
    setNameValue(event.target.value);
  }

  function handleGradeInput(event) {
    setGradeValue(event.target.value);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function buttonHandler() {
    const newDiv = {
      id: elements.length,
      content: [
        { type: "img", value: imageSrc },
        { type: "h1", value: nameValue },
        { type: "span", value: gradeValue },
      ],
    };

    const updatedElements = [...elements, newDiv];
    setElements(updatedElements);
    localStorage.setItem("elements", JSON.stringify(updatedElements));
    clearForm();
  }

  function clearForm() {
    setNameValue("");
    setGradeValue("");
    setImageSrc("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  //* TODO: Delete Function

  function Delete(id) {
    const updatedData = elements.filter((el) => el.id !== id);
    setElements(updatedData);
    localStorage.setItem("elements", JSON.stringify(updatedData));
  }

  function startEditing(id, currentName) {
    setEditMode(id);
    setEditName(currentName);
  }

  function startEditingGrade(id, currentGrade) {
    setEditModeGrade(id);
    setEditSpan(currentGrade);
  }

  useEffect(() => {
    const storedElements = localStorage.getItem("elements");
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);
  //* EDITING
  function Edit(id) {
    const editedTasks = elements.map((element) => {
      if (id === element.id) {
        return {
          ...element,
          content: element.content.map((item) =>
            item.type === "h1" ? { ...item, value: editName } : item
          ),
        };
      }
      return element;
    });
    setElements(editedTasks);
    localStorage.setItem("elements", JSON.stringify(editedTasks));
    setEditMode(null);
  }

  //* EDITING
  function EditGrade(id) {
    const editedGrade = elements.map((element) => {
      if (id === element.id) {
        return {
          ...element,
          content: element.content.map((item) =>
            item.type === "span" ? { ...item, value: editSpan } : item
          ),
        };
      }
      return element;
    });
    setElements(editedGrade);
    localStorage.setItem("elements", JSON.stringify(editedGrade));
    setEditModeGrade(null);
  }

  return (
    <>
      <div className="MainPage-div">
        <div>
          <form>
            <label htmlFor="Name">Название</label>
            <input type="text" value={nameValue} onChange={handleNameInput} />

            <label htmlFor="grade">Оценка</label>
            <input type="text" value={gradeValue} onChange={handleGradeInput} />

            <label htmlFor="picture">Выберите файл: </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <button type="button" onClick={buttonHandler}>
              Отправить
            </button>
          </form>
        </div>
      </div>
      <div className="grids">
        {elements.map((div) => (
          <div className="grid" key={div.id}>
            {div.content.map((item, index) => {
              if (item.type === "h1") {
                return (
                  <div key={index}>
                    {editMode === div.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="input-save"
                      />
                    ) : (
                      <h1>{item.value}</h1>
                    )}
                  </div>
                );
              } else if (item.type === "span") {
                return (
                  <div key={index}>
                    {editModeGrade === div.id ? (
                      <input
                        type="text"
                        value={editSpan}
                        onChange={(e) => setEditSpan(e.target.value)}
                        className="input-save"
                      />
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                );
              } else if (item.type === "img") {
                return <img key={index} src={item.value} alt="Uploaded" />;
              }
              return null;
            })}

            {/* Delete button */}
            <div className="btns">
              <button onClick={() => Delete(div.id)} className="delete-btn">
                Delete
              </button>
              {/* EDIT BUTTON */}
              {editMode === div.id ? (
                <>
                  {/* EDIT BUTTON */}
                  <button className="save-btn" onClick={() => Edit(div.id)}>
                    Save Name
                  </button>
                </>
              ) : (
                <>
                  {/* EDIT BUTTON */}
                  <button
                    className="edit-btn"
                    onClick={() =>
                      startEditing(
                        div.id,
                        div.content.find((item) => item.type === "h1").value
                      )
                    }
                  >
                    Edit Name
                  </button>
                </>
              )}
              {editModeGrade === div.id ? (
                <button className="save-btn" onClick={() => EditGrade(div.id)}>
                  Save Mark
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() =>
                    startEditingGrade(
                      div.id,
                      div.content.find((item) => item.type === "span").value
                    )
                  }
                >
                  Edit Mark
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MainPage;
