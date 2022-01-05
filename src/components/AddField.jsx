import { useState } from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({ addTask }) => {
  const [task, setTask] = useState({ text: '', complete: false });
  const [focusItem, setFocusItem] = useState(true);

  const handlerTextField = (e) => {
    setTask({ ...task, text: e.target.value });
  }

  const handlerCheckbox = (e) => {
    setTask({ ...task, complete: e.target.checked });
  }

  const onClickAdd = () => {
    if (task.text !== '') {
      addTask(task);
      setTask({ text: '', complete: false });
    }
  }

  const onKey = (e) => {
    // console.log('e.code', e.code, 'e.keyCode', e.keyCode);
    if (focusItem) {
      //ENTER - добавляем задачу
      if (e.keyCode === 13) {
        onClickAdd();
      }

      //ESC - toogle comlete
      if (e.keyCode === 27) {
        setTask({ ...task, complete: !task.complete });
      }
    }
  }

  return (
    <div className="field">
      <Checkbox
        onChange={handlerCheckbox}
        className='checkbox'
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={task.complete}
      />
      <TextField
        onChange={handlerTextField}
        autoFocus={focusItem}
        onFocus={() => setFocusItem(true)}
        onBlur={() => setFocusItem(false)}
        onKeyDown={onKey}
        placeholder='Введите текст задачи...'
        variant='standard'
        fullWidth
        value={task.text}
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};
