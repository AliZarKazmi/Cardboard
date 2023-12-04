import Description from "../Cardboard/Description";
import ConfigureReel from "./ConfigureReel";

const Banner = ({ products }) => {
  return (
    <section className="inner-banner bg-gray">
      <div className="container">
        <div className="row">
          <Description
            heading="Reels"
            description="Paper reels are an integral part of the paper industry and serve various purposes, from packaging and printing to manufacturing paper products. These reels are formed by winding a continuous length of paper onto a cylindrical core, creating a versatile and sturdy format that can be used for a wide range of applications. The quality and thickness of the paper used for these reels can be tailored to suit the specific needs of businesses, providing a customizable solution for printing and packaging requirements.."
            src="/img/reels_header_image.png"
          />
          <div className="col-lg-6">
            <ConfigureReel products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
