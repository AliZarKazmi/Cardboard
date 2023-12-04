import OurProducts from "../Component/Our-Products/OurProducts";
import OurPeople from "../Component/Our-People/OurPeople";
import BoxInspiration from "../Component/BoxInspirations/BoxInspirations";
import Header from "../Component/Header";


const images = [
  { src: "img/inspiration_small_1.png" },
  { src: "img/inspiration_small_2.png" },
  { src: "img/inspiration_big_1.png" },
  { src: "img/inspiration_big_2.png" },
  { src: "img/inspiration_small_3.png" },
  { src: "img/inspiration_small_4.png" },
];
function IndexPage() {
  return (
    <>
      <Header />
      <OurProducts />
      <OurPeople />
      <BoxInspiration
        title="Box Inspirations"
        disc="Our mission is to provide packaging solutions that cater to
                businesses of all types. Whether you require custom retail
                packaging with your logo or corrugated cardboard mailers for
                your ecommerce business, we offer plenty of inspiration to help
                you create unique and personalized product packaging that fits
                your needs."
        images={images}
      />
    </>
  );
}

export default IndexPage;
