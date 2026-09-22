
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [orderComplete, setOrderComplete] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState("5");
  const [comments, setComments] = useState("");

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  const handleQuantityChange = (id, newQty) => {
    dispatch(updateQuantity({ id, quantity: Number(newQty) }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated || !user) {
      alert("Please login to complete your order!");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    const order = {
      id: `PZ-${Date.now()}`,
      username: user.username,
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({ ...item })),
      total: totalAmount,
    };

    const storageKey = `pizzeria_orders_${user.username}`;

    const existingOrders = (() => {
      try {
        const parsed = JSON.parse(
          localStorage.getItem(storageKey) || "[]"
        );
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })();

    existingOrders.unshift(order);

    localStorage.setItem(storageKey, JSON.stringify(existingOrders));

    setCurrentOrder(order);
    setOrderComplete(true);
    dispatch(clearCart());
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    if (!user || !currentOrder) {
      return;
    }

    const feedbackKey = `pizzeria_feedback_${user.username}`;

    const existingFeedback = (() => {
      try {
        const parsed = JSON.parse(
          localStorage.getItem(feedbackKey) || "[]"
        );
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })();

    existingFeedback.unshift({
      id: Date.now(),
      orderId: currentOrder.id,
      username: user.username,
      rating: Number(rating),
      comments: comments.trim(),
      date: new Date().toISOString(),
    });

    localStorage.setItem(
      feedbackKey,
      JSON.stringify(existingFeedback)
    );

    setFeedbackSubmitted(true);
  };

  if (feedbackSubmitted) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-lg border-0 rounded-4 p-5 mx-auto max-width-600">
          <div className="display-1 text-success mb-3">🎉</div>

          <h2 className="fw-bold mb-3">
            Thank You for Your Feedback!
          </h2>

          <p className="text-muted mb-4">
            We appreciate your input. Your delicious order is on its way!
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <Link
              to="/orders"
              className="btn btn-warning btn-lg fw-bold px-4"
            >
              View Order History
            </Link>

            <Link
              to="/order"
              className="btn btn-outline-dark btn-lg fw-bold px-4"
            >
              Order More Pizza
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-success text-white text-center py-4">
                <div className="display-4 mb-2">✅</div>

                <h3 className="fw-bold mb-0">
                  Order Placed Successfully!
                </h3>

                <p className="mb-0 text-white-50">
                  Estimated delivery time: 45 minutes
                </p>

                {currentOrder && (
                  <p className="mb-0 text-white-50">
                    Order ID: <strong>{currentOrder.id}</strong>
                  </p>
                )}
              </div>

              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 text-center">
                  How was your experience?
                </h5>

                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="rating"
                      className="form-label fw-semibold"
                    >
                      Rating
                    </label>

                    <select
                      id="rating"
                      className="form-select rounded-3"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="5">
                        ⭐⭐⭐⭐⭐ - Excellent
                      </option>
                      <option value="4">
                        ⭐⭐⭐⭐ - Good
                      </option>
                      <option value="3">
                        ⭐⭐⭐ - Average
                      </option>
                      <option value="2">
                        ⭐⭐ - Poor
                      </option>
                      <option value="1">
                        ⭐ - Very Bad
                      </option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="comments"
                      className="form-label fw-semibold"
                    >
                      Comments / Review
                    </label>

                    <textarea
                      id="comments"
                      className="form-control rounded-3"
                      rows="4"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Tell us what you liked about ordering with us..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-2 fw-bold rounded-3 shadow-sm"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-4">🛒 Your Pizza Cart</h2>

        {cartItems.length > 0 && (
          <button
            className="btn btn-outline-danger btn-sm px-3 rounded-3"
            onClick={handleClearCart}
          >
            Clear All
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 card shadow-sm border-0 rounded-4">
          <div className="display-1 text-muted mb-3">🍕</div>

          <h4 className="fw-semibold">Your cart is empty</h4>

          <p className="text-muted mb-4">
            Looks like you haven't added any pizzas to your cart yet.
          </p>

          <div>
            <Link
              to="/order"
              className="btn btn-warning fw-bold px-4"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between border-bottom py-3 gap-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />

                      <div>
                        <h5 className="fw-bold mb-1">{item.name}</h5>

                        <p className="text-muted small mb-1">
                          ₹{item.price}
                        </p>

                        {item.extraToppings?.length > 0 && (
                          <p className="text-muted small mb-0">
                            {item.extraToppings.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span className="fw-bold px-2">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Total</span>
                  <strong>₹{totalAmount}</strong>
                </div>

                <button
                  className="btn btn-warning w-100 py-2 fw-bold rounded-3"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;