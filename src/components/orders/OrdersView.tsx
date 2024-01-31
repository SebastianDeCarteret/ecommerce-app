import { Order } from "../../models/order.model";
import { User } from "../../models/user.model";
import { useNavigate } from "react-router-dom";
import SingleOrder from "./SingleOrder";

interface Types {
  orders: Order[];
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function OrdersView({ orders, user, setUser }: Types) {
  const navigate = useNavigate();

  return (
    <>
      <header className="main-header">
        <img
          src="src\assets\currys.png"
          alt="Currys Logo"
          className="currys-logo"
        />
        <h1>Order History</h1>
        <div className="header-buttons-container">
          <button className="basket" onClick={() => navigate("/basket")}>
            <img
              onClick={() => navigate("/basket")}
              src="..\src\assets\basket.png"
              alt="basket button"
            />
          </button>
          <button onClick={() => navigate("/products")}>Home</button>
          <button className="logout" onClick={() => setUser(null)}>
            <img
              onClick={() => setUser(null)}
              src="..\src\assets\logout.png"
              alt="logout button"
            />
          </button>
        </div>
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </header>
      <div className="orders-container">
        {orders.map((order, index) => {
          {
            return (
              <>
                <div className="single-order-container">
                  <h1>
                    Order number: CR-
                    {order.id}
                  </h1>
                  <h3>Items:</h3>
                  <SingleOrder order={order} index={index} />
                </div>
              </>
            );

            // return order.products.map((product) => {
            //   return (
            //     <div>
            //       <h1>{order.id}</h1>
            //       <p>{product.name}</p>
            //     </div>
            //   );
            // });
          }
        })}
      </div>
      <button onClick={() => navigate("/products")}>Back</button>
    </>
  );
}
