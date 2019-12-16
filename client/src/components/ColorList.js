import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";
// import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState([]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColors = color => {
    setAddColor(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colors.id}`, colorToEdit)
      .then(res => {
        console.log("PUT:I GOT ME A NEW XBOOOOX 360", res);
        updateColors([...colors, res.data]);
        // props.history.push("/BubblePage");
      })
      .catch(err => {
        console.error("PUT: YOURE A LOSER", err);
      });
  };

  const newColors = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/colors", addColor)
      .then(res => {
        console.log("", res.data);
        updateColors(res.data);
      })
      .catch(err => {
        console.log("", err);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(() => {
        console.log("DELETE: bye bye!");
        updateColors(
          colors.filter(notDeleted => {
            return notDeleted.id !== color.id;
          })
        );
      })
      .catch(err => {
        console.log("DELETE:im still here", err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form>
        <legend>Add Color</legend>
        <input
          type="name"
          placeholder="colorname"
          name="colorname"
          // value={colorToEdit.color}
        />
        <input
          type="name"
          placeholder="hex"
          name="colorname"
          // value={colorToEdit.code.hex}
        />
      </form>
      <div className="button-row">
        <button type="submit">save</button>
        <button>cancel</button>
      </div>
    </div>
  );
};

export default ColorList;

{
  /* <input
  placeholder="name"
  type="text"
  name="name"
  value={props.name}
  onChange={props.handleChanges}
/> */
}
