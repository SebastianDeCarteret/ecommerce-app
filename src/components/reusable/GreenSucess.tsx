import { useNavigate } from "react-router-dom";

interface Types {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  message: string;
  time: number;
  shouldNavigateToBasket: boolean;
}

export default function GreenSucess({
  state,
  setState,
  message,
  time,
  shouldNavigateToBasket,
}: Types) {
  let timer: NodeJS.Timeout;
  const navigate = useNavigate();
  if (state) {
    timer = setTimeout(() => {
      setState(false);
    }, time * 1000);
  }

  return state ? (
    <div className="sucess-alert">
      <p>{message}</p>
      <>
        {shouldNavigateToBasket ? (
          <>
            <button onClick={() => navigate("/basket")}>Go to basket</button>
            <button
              onClick={() => {
                clearTimeout(timer);
                setState(false);
              }}
            >
              X
            </button>
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  ) : (
    <></>
  );
}
