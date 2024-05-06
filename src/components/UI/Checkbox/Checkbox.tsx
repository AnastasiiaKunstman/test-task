import { FC, ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
    id: string;
}

const Checkbox: FC<CheckboxProps> = ({ id, ...props }) => {
    return (
        <div className={styles.checkbox_wrapper}>
            <input
                {...props}
                type="checkbox"
                id={`checkbox-${id}`}
            />
            <label className={styles.terms_label} htmlFor={`checkbox-${id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className={styles.checkbox_svg}>
                    <mask fill="white" id="path-1-inside-1_476_5-37">
                        <rect height="200" width="200"></rect>
                    </mask>
                    <rect
                        mask="url(#path-1-inside-1_476_5-37)"
                        strokeWidth="40"
                        className={styles.checkbox_box}
                        height="200"
                        width="200"
                    ></rect>
                    <path
                        strokeWidth="15"
                        d="M52 111.018L76.9867 136L149 64"
                        className={styles.checkbox_tick}
                    ></path>
                </svg>
                <span className={styles.label_text}>{props.name}</span>
            </label>
        </div>
    )
};

export default Checkbox;
