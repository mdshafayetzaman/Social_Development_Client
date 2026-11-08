
import About from './component/about';
import Hero from './component/hero';
import Stories from './component/stories';
import WhyKindred from './component/whyKindred';

const HomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <About></About>

      <WhyKindred></WhyKindred>
      <Stories></Stories>
    </div>
  );
};

export default HomePage;
