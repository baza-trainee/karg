import styles from "../styles/helpSideBar.module.scss"

export default function FAQTab() {
    return (
        <div>
            <article>
                <div className={styles.pageTitle}>
                    <h2>FAQ Tab</h2>
                </div>
                <div className={styles.pageContent}>
                    <p>FAQ Tab content</p>
                </div>
            </article>
        </div>
    )
}