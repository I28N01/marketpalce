import styles from "./Button.module.scss";

export default function primary({ text, view, type }) {
    if (view === 'primary') {
        return (<button className={styles.primary} type={type} >{text}</button>);
    }

    if (view === 'secondary') {
        return (<button className={styles.secondary} type={type}>{text}</button>);
    }

    if (view === 'tertiary') {
        return (<button className={styles.tertiary} type={type}>{text}</button>);
    }



}
