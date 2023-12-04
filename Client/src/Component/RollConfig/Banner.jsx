import Description from "../Cardboard/Description";
import ConfigureRoll from "./ConfigureRoll";

const Banner = ({ products }) => {
  return (
    <section className="inner-banner bg-yellow">
      <div className="container">
        <div className="row">
          <Description
            heading="Rolls"
            description="Cardboard rolls, also known as paper tubes, are cylindrical
                structures made from paperboard material. They are typically
                used for packaging purposes, such as holding rolls of paper,
                fabric, or other materials. Additionally, cardboard rolls have a
                wide range of other uses, from crafting projects to building
                construction."
            src="/img/rolls 1.png"
          />
          <div className="col-lg-6">
            <ConfigureRoll products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
