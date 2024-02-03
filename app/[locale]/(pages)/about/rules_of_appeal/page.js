import PageHero from "@/components/PageHero/pageHero";
import mobImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-mob.jpg";
import tablImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-tabl.jpg";
import deskImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-desk.jpg";

const RulesOfAppeal = () => {
    const altText = "Rescuers near the man";
    const buttonText = "Правила звернення";

    return (
        <PageHero
            mobImage={mobImage}
            tablImage={tablImage}
            deskImage={deskImage}
            buttonText={buttonText}
            altText={altText} />
        
    );
};

export default RulesOfAppeal;