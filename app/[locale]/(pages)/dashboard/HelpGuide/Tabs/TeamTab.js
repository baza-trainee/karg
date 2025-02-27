import styles from "../styles/helpSideBar.module.scss"

export default function TeamTab() {
    return (
        <div>
            <article>
                <div className={styles.pageTitle}>
                    <h2>Team Tab</h2>
                </div>
                <div className={styles.pageContent}>
                    <p>Team Tab content</p>
                </div>
            </article>
        </div>
    )
}