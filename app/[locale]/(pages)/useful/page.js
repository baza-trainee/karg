import PageHero from "@/components/common/PageHero/pageHero";
import mobImage from "@/public/assets/images/useful/advices/advices-hero-mob.jpg";
import tablImage from "@/public/assets/images/useful/advices/advices-hero-tab.jpg";
import deskImage from "@/public/assets/images/useful/advices/advices-hero-desk.jpg";

const Useful = () => {

    const altText = "rescue members are smiling";
    const buttonText =  t('pseudoButtonText');

    return (
        <main>
            <PageHero
                mobImage={mobImage.src}
                tablImage={tablImage.src}
                deskImage={deskImage.src}
                buttonText={buttonText}
                altText={altText}
            />
        </main>
    );
};
export default Useful;