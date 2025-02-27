import styles from "../styles/helpSideBar.module.scss"

export default function HelpTab() {
    return (
        <div>
            <article>
                <div className={styles.pageTitle}>
                    <h2>Help Tab</h2>
                </div>
                <div className={styles.pageContent}>
                    <p>Help Tab content</p>
                </div>
            </article>
        </div>
    )
}