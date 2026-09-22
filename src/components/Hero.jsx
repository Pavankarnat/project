const Hero = () => {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-semibold mb-4">Our Story</h1>
        <p className="text-start">
          We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on
          our Facebook fan page. Fans were given situations where they had to
          come up with wacky and fun excuses. The person with the best excuse
          won the Best Excuse Badge and won Pizzeria's vouchers. Their
          enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the
          Tastiest Pan Pizza. Ever!
        </p>
        <p className="text-start">
          Ever since we launched the Tastiest Pan Pizza, ever, people have not
          been able to resist the softest, cheesiest, crunchiest, butteriest
          Domino's Fresh Pan Pizza. They have been leaving the stage in the
          middle of a performance and even finding excuses to be disqualified in
          a football match.
        </p>
        <p className="text-start">
          We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan
          page. Fans were given situations where they had to come up with wacky
          and fun excuses. The person with the best excuse won the Best Excuse
          Badge and won Domino's vouchers. Their enthusiastic response proved
          that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!{" "}
        </p>
      </div>

      <div className="row align-items-center gy-4 mb-5">
        <div className="col-lg-5">
          <img
            src="/ingredients.jpg"
            alt="ingredients logo"
            height={"200px"}
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>

        <div className="col-lg-7">
          <h2 className="mb-3">Ingredients</h2>
          <p>
            We're ruthless about goodness. We have no qualms about tearing up a
            day-old lettuce leaf (straight from the farm), or steaming a baby
            (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir. While
            they're still young and fresh - that's our motto. It makes the
            kitchen a better place.
          </p>
        </div>
      </div>

      <div className="row align-items-center gy-4 mb-5">
        <div className="col-lg-5 order-2 order-lg-1">
          <h2 className="mb-3">Our Chefs</h2>
          <p>
            They make sauces sing and salads dance. They create magic with
            skill, knowledge, passion, and stirring spoons (among other things).
            They make goodness so good, it doesn't know what to do with itself.
            We do though. We send it to you.
          </p>
        </div>
        <div className="col-lg-7 order-1 order-lg-2">
          <img
            src="/chefs.webp"
            alt="chefs logo"
            height={"200px"}
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>
      </div>

      <div className="row align-items-center gy-4">
        <div className="col-lg-5">
          <img
            src="/time.jpg"
            alt="time logo"
            height={"200px"}
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>

        <div className="col-lg-7">
          <h2 className="display-7 fw-semibold">45 min delivery</h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
