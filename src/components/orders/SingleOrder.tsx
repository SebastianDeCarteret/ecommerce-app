import { Order } from "../../models/order.model";
import { useNavigate } from "react-router-dom";

interface Types {
  order: Order;
  index: number;
}

export default function SingleOrder({ order, index }: Types) {
  return order.products.map((product) => {
    return (
      <div className="order-item-container" key={index}>
        <p>{product.name}</p>
      </div>
    );
  });
}
