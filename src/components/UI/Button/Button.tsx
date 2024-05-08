import { FC, ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    buttonTxt: string;
}

const Button: FC<ButtonProps> = ({ buttonTxt, ...props }) => {
    return (
        <button {...props} className={styles.button}>
            {buttonTxt}
        </button>
    );
};

export default Button;
