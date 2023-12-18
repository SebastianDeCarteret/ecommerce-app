import { useNavigate } from "react-router-dom";

interface Types {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  message: string;
  time: number;
}

export default function RedError({ state, setState, message, time }: Types) {
  const navigate = useNavigate();
  let timer: NodeJS.Timeout;

  if (state) {
    timer = setTimeout(() => {
      setState(false);
    }, time * 1000);
  }

  return state ? (
    <div className="error-alert">
      <p>{message}</p>
      <button onClick={() => navigate("/basket")}>Go to basket</button>
      <button
        onClick={() => {
          clearTimeout(timer);
          setState(false);
        }}
      >
        X
      </button>
    </div>
  ) : (
    <></>
  );
}
