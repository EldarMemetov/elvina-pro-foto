import Hero from '@/modules/Hero/Hero';
import s from './page.module.scss';
import Introduction from '@/modules/Introduction/Introduction';
import About from '@/modules/About/About';
import Experience from '@/modules/Experience/Experience';
import Locations from '@/modules/Locations/Locations';
import Faq from '@/modules/Faq/Faq';
import Works from '@/modules/Works/Works';

export default async function Home({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ru'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div className={s.container}>
      <Hero />
      <Introduction />
      <About />
      <Works />
      <Experience />
      <Locations />
      <Faq />
    </div>
  );
}
