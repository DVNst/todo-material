import React from "react";
import { IconButton, Checkbox, ListItem, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Item = ({ task, deleteTask }) => {
  const handlerDeleteItem = () => {
    if (window.confirm(`Удалить задачу ${task.text}?`)) {
      deleteTask(task.id);
    }
  }

  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          checked={task.copmlete}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        <Typography className="item-text">{task.text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={handlerDeleteItem}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
