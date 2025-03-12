'use client';
import { useEffect, useState } from "react";
import { getById } from "@/components/common/api/apiGet";
import Image from "next/image";
import styles from '@/app/[locale]/(pages)/useful/advices/[id]/styles/[id].module.scss';
import variables from '@/app/[locale]/variables.module.scss';
import SocialIcons from "@/components/SocialIcons/socialIcons";
import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import GoBackIcon from "@/components/ServerSideIcon/GoBackIcon";
import { useRouter } from "next/navigation";

const ArticleClient = ({ id, cultureCode, API_BASE_URL, endpoint, translations }) => {
    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                setLoading(true);
                const res = await getById(endpoint, id, cultureCode);
                if (res.status === 404) {

                    router.push(`/not-found`);
                    return;
                }
                setAdvice(res);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching advice:", err);
                setError(err.message || "Failed to load article");
                setLoading(false);
            }
        };

        fetchAdvice();
    }, [id, cultureCode]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!advice) return <div className={styles.notFound}>Article not found</div>;

    const adviceBody = advice.description;
    const adviceArray = adviceBody.split("\n");
    const dataArray = advice.created_At.split("/");
    let correctOrder = [dataArray[1], dataArray[0], dataArray[2]].join(".");

    return (
        <div className={styles.container}>
            <GoBackButton className={styles.goBackButton}>
                <GoBackIcon />
                <span className={variables.advicesButton_page}>{translations.goBackButtonText}</span>
            </GoBackButton>

            <div className={`${variables.Heading3} ${styles.adviceTitle}`}>
                {advice.title}
            </div>
            <div className={styles.line}></div>

            <div className={styles.wrapper}>
                <div className={styles.imageContainer}>
                    <Image
                        loading="lazy"
                        width={570}
                        height={393}
                        className={`${styles.image} ${styles.deskImage}`}
                        src={`${API_BASE_URL}${advice.images[0]}`}
                        alt="pet image"
                        quality={100}
                        sizes="33vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        loading="lazy"
                        width={706}
                        height={487}
                        className={`${styles.image} ${styles.tablImage}`}
                        src={`${API_BASE_URL}${advice.images[0]}`}
                        alt="pet image"
                        quality={100}
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        loading="lazy"
                        width={288}
                        height={199}
                        className={`${styles.image} ${styles.mobImage}`}
                        src={`${API_BASE_URL}${advice.images[0]}`}
                        alt="pet image"
                        quality={100}
                        sizes="33vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                </div>
                <div className={`${variables.Subtitle3} ${styles.adviceTimeStamp} ${styles.mb15}`}>
                    {cultureCode === "ua" ? `Опубліковано ${(correctOrder)}` : `Published ${correctOrder}`}
                </div>

                {adviceArray.map((paragraph, index) => (
                    <div key={index} className={`${variables.Text3}`}>
                        <p className={styles.paragraph}>
                            {paragraph}
                        </p>
                    </div>
                ))}
            </div>

            <div className={styles.shareContainer}>
                <span className={variables.Subtitle3}>{translations.shareText}</span>
                <div className={styles.iconsContainer}>
                    <SocialIcons className={styles.socIcons} />
                </div>
            </div>
        </div>
    );
};

export default ArticleClient;