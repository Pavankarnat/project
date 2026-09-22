import pizzas from "./pizzas.json";
import PizzaCard from "./PizzaCard";

const OrderPizza = () => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {pizzas.map((pizza) => (
          <div className="col-lg-6 mb-4" key={pizza.id}>
            <PizzaCard pizza={pizza} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPizza;
