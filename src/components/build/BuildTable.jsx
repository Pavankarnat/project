import ingredients from "./ingredients.json";

const BuildTable = ({ selectedItems, onIncrement, onDecrement }) => {
  return (
    <div className="table-responsive shadow rounded">
      <table className="table table-bordered table-hover align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Ingredient</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((item) => {
            const selected = selectedItems.find((i) => i.id === item.id);
            const qty = selected ? selected.qty : 0;

            return (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image.replace("%22", "")}
                    alt={item.tname}
                    width="70"
                    height="70"
                    className="rounded-circle object-fit-cover"
                  />
                </td>

                <td className="fw-semibold">{item.tname}</td>

                <td>₹{item.price}</td>

                <td>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm px-2"
                      onClick={() => onDecrement(item.id)}
                      disabled={qty === 0}
                    >
                      -
                    </button>
                    <span className="fw-bold px-2" style={{ minWidth: "1.5rem" }}>
                      {qty}
                    </span>
                    <button
                      className="btn btn-outline-warning btn-sm px-2"
                      onClick={() => onIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BuildTable;