import { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={styles.ui_checkbox} />
  )
};

export default Checkbox;
