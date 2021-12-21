import { useState } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ addTask }) => {
  const [task, setTask] = useState({text: '', copmlete: false});

  const handlerTextField = (e) => {
    setTask({...task, text: e.target.value});
  }

  const handlerCheckbox = (e) => {
    setTask({...task, copmlete: e.target.checked});
  }

  const handlerClickAdd = () => {
    if (task.text !== '') {
      addTask(task);
      setTask({text: '', copmlete: false});
    }
  }

  return (
    <div className="field">
      <Checkbox
        onChange={handlerCheckbox}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={task.copmlete}
      />
      <TextField
        onChange={handlerTextField}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
        value={task.text}
      />
      <Button onClick={handlerClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};
