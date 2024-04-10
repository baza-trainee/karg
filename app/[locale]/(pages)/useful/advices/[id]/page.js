// TODO replace fake API route
// remove imageAlt value and " Кіт на дереві"

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Image from "next/image";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import GoBackIcon from "@/components/ServerSideIcon/GoBackIcon";
import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import variables from '@/app/[locale]/variables.module.scss';
import mobImage from "@/public/assets/images/useful/advices/adviceItem/adviceCardExample-mob.jpg";
import tabImage from "@/public/assets/images/useful/advices/adviceItem/adviceCardExample-tab.jpg";
import deskImage from "@/public/assets/images/useful/advices/adviceItem/adviceCardExample-desk.jpg";
import SocialIcons from "@/components/SocialIcons/socialIcons";


const i18nNamespaces = ["advices", "common"];
import styles from '../[id]/styles/[id].module.scss';


const ItemAdvice = async({params:{locale, id}}) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
  
    const imageAlt = "pet image";
    const adviceBodyPart1 = "Найпоширеніша заявка в Команду порятунку тварин - зняти кота з дерева.";
    const adviceBodyPart2 = "Якщо кіт заліз на дерево, то з імовірністю 80% (підраховано за довгі роки роботи) він злазить самостійно протягом доби. При цьому він може робити багато невдалих спроб, годинами сидіти на місці і кричати, робити вигляд, що не може злізти сам, і привертати до себе увагу. Але кіт, який сидить менше доби - допомоги зазвичай не потребує.";
    const adviceBodyPart3 = "Кіт не може за добу втомитися настільки, щоб упасти з дерева, навіть якщо сидить на тонкій гілці. Найчастіше люди не вірять, і думають, що з тонкої гілки кота може здути вітром. А ви пробували струсити з тонкої гілки кота? Ми - пробували. І можемо однозначно відповісти: вітром його не здує. Що відбувається, якщо до кота, який сидить на дереві недовго, починають підніматися рятувальники? Він починає тікати вище по дереву. Він може добігти до тонкої гілки і зістрибнути з неї вниз, і страховку внизу навіть не встигнуть натягнути. Він може залізти на верхівку дерева і рятувальна операція займе багато годин. У результаті кіт має набагато більше шансів постраждати, ніж якби він просто почекав добу.";
    const adviceBodyPart4 = "Люди в благих цілях люблять погрожувати, перебільшувати, спотворювати факти. Вони думають, що якщо побачать дворового кота, який щойно заліз на дерево, і навмисно скажуть, що він сидить добу, щоб до нього приїхали - зроблять коту краще. Це не так. Змусивши приїхати екіпаж на місце погрозами або обманом, ви зробите коту тільки гірше. Кіт не відчуває, що йому потрібна допомога, він просто сидить - і поводитиметься відповідно, що може призвести до травм і навіть смерті тварини від стрибка з великої висоти.";
    const adviceBodyPart5 = " Протягом доби, а іноді навіть близько 36 годин - кіт поступово починає заспокоюватися і спускається сам. Але без загрози для життя він може провести на дереві до трьох діб. Уже після трьох діб перебування на дереві настає ризик зневоднення, слабкості та випадкового падіння. Важкі наслідки для здоров'я настають від 5 і вище діб.";
    const adviceBodyPart6 = "Зазвичай після доби кіт, навіть якщо не зліз, стає спокійнішим і добрішим, втомлюється, і зняти його набагато простіше (бувають і неприємні винятки, і коти, які після тижня знаходження на дереві залишаються злими, шуганними, і бігають, як білки, з гілки на гілку).";
    const adviceBodyPart7 = " Виклик на кота на дереві не є екстреним або пріоритетним!";
    const adviceBodyPart8 = "Навіть якщо кіт вже сидить на дереві добу і більше, екіпаж не буде їхати знімати кота, поки має більш пріоритетні виклики, де є реальна загроза життю тварини. Навіть якщо Ви зателефонуєте на диспетчерську 10 і 20 разів, Ви не зміните цього рішення. Навіть якщо писатимете смски з погрозами і голосно матюкатимете диспетчера і весь особовий склад. Кіт буде знятий з дерева не раніше, ніж через добу, після того, як він туди заліз, і не пізніше, ніж через добу після надходження заявки. (І, до речі, роботу висотника бажано, по-можливості, оплачувати).";
    const adviceBodyPart9 = "У жодному разі, якщо Вам відмовили в негайному виїзді, не починайте знімати кота самостійно. Некваліфіковані дії зі зняття кота призведуть до одного з негативних наслідків - або Ви заженете кота ще вище (а якщо гнати кота, який зручно сидів на розвилці на дереві, нагору, рано чи пізно він пройде точку неповернення, і буде стрибати), або схопите кота, а він завдасть Вам травм та укусів (якщо це дворовий кіт, він обов'язково це зробить), або впадете з дерева, якщо не були застраховані, і отримаєте травми вже від цього. (До речі, якщо Ви полізли на дерево по кота самі, бо ми відмовили - це не означає, що ми несемо відповідальність за Ваш невдалий вчинок, як багато хто вважає).";
    const adviceBodyPart10 = "Не треба бігати під деревом, голосно кликати кота, поливати все навколо літрами валер'янки. Валер'янка може іноді прискорити спуск кота (дорослого самця, не кішки або кошеняти), але якщо він злізе за валер'янкою, то зможе злізти і сам, а якщо не злізе, то нам потім це все нюхати).";
    const adviceBodyPart11 = "Просто залиште кота, що сидить на дереві, у спокої, не турбуйте його і нас. А через добу подивіться на дерево ще раз, якщо кіт все ще там - набирайте, і залишайте заявку. Це ж зовсім не складно.";
    const adviceBodyPart12 = 'Тепер про винятки: Вирішальним фактором для негайного виїзду на кота на дереві може бути тільки отримання ним травм, які змусили його туди залізти. Наприклад - кіт випав з вікна високого поверху, кота покусали собаки, він потрапив під машину - і після цього заліз на дерево. У такому разі кіт може постраждати від ненадання йому ветдопомоги швидше, ніж здогадається злізти, і його треба знімати скоріше. Якщо на дереві сидить домашній кіт, який втік з дому і не знайде самостійно дорогу назад, і не живе на самовигулі, це не скасовує всього перерахованого вище - кіт так само може злякатися висотника, залізти вище і зірватися. Але розуміючи той факт, що господарі кота найімовірніше не зможуть ночувати під деревом, чекаючи, поки кіт злізе до них, зазвичай таких котів на ніч намагаємося не залишати. Виклик цей, як і раніше, не має підвищеного пріоритету, але до закінчення нічної зміни його буде опрацьовано (зазвичай приблизно до 2-ї години ночі). Рекомендуємо заздалегідь знайти трьох або чотирьох добровольців, готових тримати під котом страхувальний тент. Ми гарантуємо, що кота буде знято, але не можемо дати 100% впевненості, що його буде виловлено. Якщо кіт падає в страхувальний тент - успіх його упіймання залежить насамперед від швидкості реакції добровольців, які тримають цей тент. Примітка: не треба кричати на нас і квапити нас, адже Вам же важко стояти під деревом і довго чекати. Якщо Ваш домашній кіт сидить на дереві - це насамперед результат Вашого за ним недогляду. Задумайтеся про це, перш ніж дзвонити п_ятий раз з питанням "Коли ж ви приїдете, ми втомилися стояти". Відповідаємо всім і відразу: приїдемо, щойно закінчимо більш екстрені виклики. Найімовірніше до 2-3 ночі. Якщо на дереві сидить кошеня. Кошеня - це тварина віком до трьох місяців. Далі - вже підліток, а на підлітка поширюються всі правила дорослих котів. На кошеня теж можна приїхати до доби, тому що воно тікає не так швидко і його переміщення по дереву простіше контролювати. Але, обов_язковою умовою дострокового виїзду на дворового кошеня є те, що заявник повинен забрати кошеня собі. Якщо кошеня зняти і відпустити, за кілька годин воно знову буде на тому ж, або сусідньому дереві, і це може тривати нескінченно довго! Одне кошеня так знімали чотири рази, поки його нарешті не забрали додому. Екстремальні погодні умови. (Це не короткий літній дощик). Мороз -10 і більше, тривала злива за холодної погоди може стати фактором для зняття кота раніше доби. Рішення про виконання робіт приймає рятувальник, а не заявник. Наприклад, у грозу або за дуже сильного вітру робота на висоті заборонена правилами техніки безпеки, і в цьому разі життя рятувальника - у пріоритеті. Кот буде знятий, коли гроза мине, або вітер трохи ослабне.';
    const adviceBodyPart13 = "Підбиваючи підсумки цієї статті: Кіт на дереві не є екстреним виїздом, за винятком пораненого кота на дереві.";
    const adviceBodyPart14 = "Протягом доби 80% котів злазять самі.";
    const adviceBodyPart15 = "Спроба зняти кота раніше доби може призвести до летального результату. Домашній кіт може бути знятий раніше, при дотриманні техніки безпеки, як виняток, але не на шкоду тваринам, які перебувають у реальній небезпеці.";
    const adviceBodyPart16 = "Роботу висотника, а в разі заміських виїздів і паливо - рекомендується, рекомендується, за можливості, оплачувати. Відсутність оплати не стане причиною невиїзду на кота, який реально сидить більше доби і потребує допомоги, так само як і обіцянка 'дати багато грошей' не стане причиною виїзду на кота, якого ще передчасно знімати";
    
    async function getOneAdvices(){
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          });
          if(response){
            const data = await response.json();
            return data;
          }
        }
        catch(e){
          console.log(e);
        }     
    }

    const res = await getOneAdvices();
    
    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
        <Header />
        <main>
            <div className={styles.container}>
            
                <GoBackButton className={styles.goBackButton}>
                  <GoBackIcon/>
                 <span className={variables.Button2}>{t('goBackButtonText')}</span>
                </GoBackButton>

                  <div className={`${variables.Heading3} ${styles.adviceTitle}`}>
                    {locale === "uk" ? "Кіт на дереві" : "Cat on a tree"}
                    {/* {locale === "uk" ? res.uk.title : res.en.title} */}
                  </div>
                  <div className={styles.line}></div>

                  <div className={styles.wrapper}>
                    <div className={styles.imageContainer}>
                      <Image
                        className={`${styles.image} ${styles.deskImage}`}
                        src={deskImage} //{res.deskImage}
                        alt={imageAlt}  //{locale === "uk" ? res.uk.imageAlt : res.en.imageAlt}
                        sizes="33vw"
                        quality={100}
                        style={{
                          width: "100vw",
                          height: "auto",
                        }}
                      />
                      <Image
                        className={`${styles.image} ${styles.tablImage}`}
                        src={tabImage} //{res.tabImage}
                        alt={imageAlt} //{locale === "uk" ? res.uk.imageAlt : res.en.imageAlt}
                        sizes="100vw"
                        quality={100}
                        style={{
                          width: "100vw",
                          height: "auto",
                        }}/>
                      <Image
                        className={`${styles.image} ${styles.mobImage}`}
                        src={mobImage} //{res.mobImage}
                        alt={imageAlt} //{locale === "uk" ? res.uk.imageAlt : res.en.imageAlt}
                        sizes="33vw"
                        quality={100}
                        style={{
                          width: "100vw",
                          height: "auto",
                        }}
                      />  
                    </div>
                    <div className={`${variables.Subtitle3} ${styles.adviceTimeStamp} ${styles.mb15}`}>
                      {locale === "uk" ? `Опубліковано 25.11.2020` : `Published 25.11.2020`}
                      {/* {locale === "uk" ? `Опубліковано ${res.uk.published}` : `Published ${res.en.published}`} */}
                    </div>

                    <div className={`${variables.Text3}`}>
                      {/* {locale === "uk" ? res.uk.body : res.en.body} */}
                      <p className={styles.paragraph}>
                        {adviceBodyPart1}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart2}
                      </p>

                      <p className={styles.paragraph}>
                        {adviceBodyPart3}
                      </p>
                    </div>
                    </div>

                      
                    <div className={`${variables.Text3}`}>
                    <p className={styles.paragraph}>
                        {adviceBodyPart4}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart5}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart6}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart7}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart8}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart9}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart10}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart11}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart12}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart13}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart14}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart15}
                      </p>
                      <p className={styles.paragraph}>
                        {adviceBodyPart16}
                      </p>  
                    </div>                  

                  <div className={styles.shareContainer}>
                    <span className={variables.Subtitle3}>{t('shareText')}</span>
                    <div className={styles.iconsContainer}>
                      <SocialIcons className={styles.socIcons}/>
                    </div>
                  </div>
            </div>            
        </main>
        <Footer />
    </TranslationsProvider>
    );
};

export default ItemAdvice;