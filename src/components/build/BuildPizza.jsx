import { useSelector, useDispatch } from "react-redux";
import BuildTable from "./BuildTable";
import {
  incrementIngredient,
  decrementIngredient,
  resetBuilder,
  selectSelectedIngredients,
  selectBuilderTotalCost,
  BASE_PRICE,
} from "../../redux/slices/pizzaSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const BuildPizza = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectSelectedIngredients);
  const totalCost = useSelector(selectBuilderTotalCost);

  const handleIncrement = (item) => {
    dispatch(incrementIngredient(item));
  };

  const handleDecrement = (id) => {
    dispatch(decrementIngredient(id));
  };

  const buildDescription = () => {
    if (selectedItems.length === 0) {
      return "Plain base pizza with no extra toppings.";
    }
    const toppingList = selectedItems
      .map((item) => (item.qty > 1 ? `${item.tname} x ${item.qty}` : item.tname))
      .join(", ");
    return `Base pizza topped with: ${toppingList}.`;
  };

  const handleBuildPizza = () => {
    const customPizza = {
      id: `custom-${Date.now()}`,
      name: "Custom Built Pizza",
      price: totalCost,
      ingredients: selectedItems.map((item) => item.tname),
      description: buildDescription(),
    };

    dispatch(addToCart(customPizza));
    dispatch(resetBuilder());
    alert(`Pizza Added to Cart! Total Cost: ₹${totalCost}`);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-warning">Build Your Pizza</h2>
        <p className="text-muted">
          Pizzeria now gives you options to build your own pizza. Customize your
          pizza by selecting ingredients from the list given below.
        </p>
        <p className="text-muted mb-0">
          Base price ₹{BASE_PRICE} — add toppings to build it up from there.
        </p>
      </div>
      <BuildTable
        selectedItems={selectedItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      <div className="text-center mt-5">
        <h3 className="text-success fw-bold">Total Cost : ₹{totalCost}</h3>
        <button
          className="btn btn-warning btn-lg mt-3 px-5 fw-bold"
          onClick={handleBuildPizza}
        >
          Build Your Pizza
        </button>
      </div>
    </div>
  );
};

export default BuildPizza;
