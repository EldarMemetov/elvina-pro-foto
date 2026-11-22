import Hero from '@/modules/Hero/Hero';
import s from './page.module.scss';
import Introduction from '@/modules/Introduction/Introduction';
import About from '@/modules/About/About';
import Experience from '@/modules/Experience/Experience';
import Locations from '@/modules/Locations/Locations';
import Faq from '@/modules/Faq/Faq';
import Works from '@/modules/Works/Works';
import Contact from '@/modules/Contact/Contact';

export default function Home() {
  return (
    <div className={s.container}>
      <Hero />
      <Introduction />
      <About />
      <Works />
      <Experience />
      <Locations />
      <Faq />
      <Contact />
    </div>
  );
}
