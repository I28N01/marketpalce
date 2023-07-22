import styles from "./Button.module.scss";

export default function primary({ text, view, }) {
    if (view === 'primary') {
        return (<button className={styles.primary} >{text}</button>);
    }

    if (view === 'secondary') {
        return (<button className={styles.secondary} >{text}</button>);
    }

    if (view === 'tertiary') {
        return (<button className={styles.tertiary} >{text}</button>);
    }



}
