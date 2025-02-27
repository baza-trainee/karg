import styles from "../styles/helpSideBar.module.scss"

export default function MyAccountTab() {
    return (
        <div>
            <article>
                <div className={styles.pageTitle}>
                    <h2>My Account Tab</h2>
                </div>
                <div className={styles.pageContent}>
                    <p>My Account content</p>
                </div>
            </article>
        </div>
    )
}