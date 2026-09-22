
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrderItems } from "../../redux/slices/cartSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const orders = (() => {
    if (!user?.username) {
      return [];
    }

    try {
      const parsed = JSON.parse(
        localStorage.getItem(
          `pizzeria_orders_${user.username}`
        ) || "[]"
      );

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const handleReorder = (order) => {
    dispatch(addOrderItems(order.items));
    navigate("/cart");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Order History</h2>

          <p className="text-muted mb-0">
            View your previous orders and reorder your favorites.
          </p>
        </div>

        <button
          className="btn btn-warning fw-bold"
          onClick={() => navigate("/order")}
        >
          Order Pizza
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5 card shadow-sm border-0 rounded-4">
          <div className="display-1 text-muted mb-3">🍕</div>

          <h4 className="fw-semibold">No orders yet</h4>

          <p className="text-muted mb-4">
            Your completed orders will appear here.
          </p>

          <div>
            <button
              className="btn btn-warning fw-bold px-4"
              onClick={() => navigate("/order")}
            >
              Browse Menu
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-12" key={order.id}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
                  <div>
                    <strong>{order.id}</strong>

                    <div className="small text-white-50">
                      {new Date(order.date).toLocaleString()}
                    </div>
                  </div>

                  <strong>₹{order.total}</strong>
                </div>

                <div className="card-body p-4">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order.id}-${item.id}-${index}`}
                      className="d-flex justify-content-between align-items-center border-bottom py-2 gap-3"
                    >
                      <div>
                        <strong>{item.name}</strong>

                        {item.description && (
                          <div className="small text-muted">
                            {item.description}
                          </div>
                        )}

                        {item.extraToppings?.length > 0 && (
                          <div className="small text-muted">
                            Toppings: {item.extraToppings.join(", ")}
                          </div>
                        )}
                      </div>

                      <div className="text-nowrap">
                        ₹{item.price} × {item.quantity}
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                    <strong>Total: ₹{order.total}</strong>

                    <button
                      className="btn btn-warning fw-bold"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;