import styles from "../styles/helpSideBar.module.scss"

export default function StatsTab() {
    return (
        <div>
            <article>
                <div className={styles.pageTitle}>
                    <h2>Stats Tab</h2>
                </div>
                <div className={styles.pageContent}>
                    <p>Stats Tab content</p>
                </div>
            </article>
        </div>
    )
}