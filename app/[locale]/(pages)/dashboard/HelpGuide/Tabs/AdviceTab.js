import styles from "../styles/helpSideBar.module.scss"

export default function AdviceTab() {
    return (
        <div>
            <article>
                <div className={styles.pageTitle}>
                    <h2>Advice Tab</h2>
                </div>
                <div className={styles.pageContent}>
                    <p>Advice Tab content</p>
                </div>
            </article>
        </div>
    )
}