import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  selectCartItems,
} from "../../redux/slices/cartSlice";

const PizzaCard = ({ pizza }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartItem = cartItems.find((item) => item.id === pizza.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddDefault = () => {
    dispatch(
      addToCart({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        image: pizza.image,
        isCustomized: false,
      }),
    );
  };

  return (
    <>
      <div className="card mb-4 shadow-sm h-100 position-relative">
        <div className="row g-0 align-items-center">
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <h4 className="fw-bold mb-0">{pizza.name}</h4>
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    background: pizza.type === "veg" ? "green" : "red",
                    display: "inline-block",
                  }}
                ></span>
                {cartItem?.isCustomized && (
                  <span className="badge bg-info text-dark ms-2">
                    Customized
                  </span>
                )}
              </div>
              <p className="text-muted">{pizza.description}</p>
              <h5>
                <b>Ingredients</b>
              </h5>
              <p>{pizza.ingredients.join(", ")}</p>
              <h5>
                <b>Toppings</b>
              </h5>
              <p>{pizza.topping.join(", ")}</p>
              <hr />
              <h5 className="fw-bold">₹{pizza.price}</h5>
            </div>
          </div>

          <div className="col-md-4 text-center position-relative p-3">
            <div className="position-relative d-inline-block">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="img-fluid rounded"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <div
                className="position-absolute bottom-0 start-50 translate-middle-x mb-2"
                style={{ zIndex: 10 }}
              >
                {quantity > 0 ? (
                  <div
                    className="d-flex align-items-center justify-content-between px-2 py-1 rounded-pill text-white fw-bold shadow"
                    style={{
                      backgroundColor: "#e91e63",
                      minWidth: "110px",
                    }}
                  >
                    <button
                      className="btn btn-sm text-white fw-bold border-0 p-0 fs-5"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: cartItem.id,
                            quantity: quantity - 1,
                          }),
                        )
                      }
                    >
                      −
                    </button>
                    <span className="fs-6 px-2">{quantity}</span>
                    <button
                      className="btn btn-sm text-white fw-bold border-0 p-0 fs-5"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: cartItem.id,
                            quantity: quantity + 1,
                          }),
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-warning fw-bold shadow-sm px-4 rounded-pill"
                    onClick={handleAddDefault}
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaCard;
