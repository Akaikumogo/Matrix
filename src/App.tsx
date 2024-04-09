import { useEffect, useState } from "react";
import bomb from "./assets/bomb1-removebg-preview.png";
import boom from "./assets/boom.png";
const App = () => {
  const [matrix, setMatrix] = useState<number[][]>(
    new Array(30).fill(0).map(() => new Array(51).fill(0))
  );

  const [cordinates, setCordinates] = useState<{ x: number; y: number }>({
    x: 30,
    y: 26,
  });
  const traps = {
    1: (
      <div className="w-full h-full flex items-center justify-center">
        <img src={bomb} width={60} height={60} />
      </div>
    ),
    0: <div className="w-full h-full flex items-center justify-center"></div>,
    2: (
      <div className="w-full h-full flex items-center justify-center">
        <img src={boom} width={60} height={60} />
      </div>
    ),
  };
  const [player, setPlayer] = useState({ hp: 100, playerName: "unnamed" });
  useEffect(() => {
    if (player.hp !== 0) {
      const handleKeyPress = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowUp":
            if (event.ctrlKey) {
              if (cordinates.x === 1) return;
              setCordinates((prev) => ({
                ...prev,
                x: prev.x === 1 ? prev.x : prev.x - 1,
              }));
              const updatedMatrix = [...matrix];
              updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 1;
              setMatrix(updatedMatrix);
            } else {
              setCordinates((prev) => ({
                ...prev,
                x: prev.x === 1 ? prev.x : prev.x - 1,
              }));
            }
            break;
          case "ArrowDown":
            if (event.ctrlKey) {
              if (cordinates.x === 30) return;
              setCordinates((prev) => ({
                ...prev,
                x: prev.x === 30 ? prev.x : prev.x + 1,
              }));
              const updatedMatrix = [...matrix];
              updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 1;
              setMatrix(updatedMatrix);
            } else {
              setCordinates((prev) => ({
                ...prev,
                x: prev.x === 30 ? prev.x : prev.x + 1,
              }));
            }
            break;
          case "ArrowLeft":
            if (event.ctrlKey) {
              if (cordinates.y === 1) return;
              setCordinates((prev) => ({
                ...prev,
                y: prev.y === 1 ? prev.y : prev.y - 1,
              }));
              const updatedMatrix = [...matrix];
              updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 1;
              setMatrix(updatedMatrix);
            } else {
              setCordinates((prev) => ({
                ...prev,
                y: prev.y === 1 ? prev.y : prev.y - 1,
              }));
            }
            break;
          case "ArrowRight":
            if (event.ctrlKey) {
              if (cordinates.y === 50) return;
              setCordinates((prev) => ({
                ...prev,
                y: prev.y === 50 ? prev.y : prev.y + 1,
              }));
              const updatedMatrix = [...matrix];
              updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 1;
              setMatrix(updatedMatrix);
            } else {
              setCordinates((prev) => ({
                ...prev,
                y: prev.y === 50 ? prev.y : prev.y + 1,
              }));
            }
            break;
          default:
            break;
        }
      };
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [cordinates, matrix, player]);
  useEffect(() => {
    if (matrix[cordinates.x - 1][cordinates.y - 1] === 1) {
      setPlayer((prev: any) => ({ ...prev, hp: prev.hp - 25 }));
      setTimeout(() => {
        const updatedMatrix = [...matrix];
        updatedMatrix[cordinates.x - 1][cordinates.y - 1] === 1
          ? null
          : (updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 0);
        setMatrix(updatedMatrix);
      }, 1000);
      const updatedMatrix = [...matrix];
      updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 2;
      setMatrix(updatedMatrix);
    }
  }, [cordinates, matrix, player]);

  return (
    <div className=" w-screen h-screen bg-slate-500 flex items-center justify-center flex-col relative">
      <div
        className={`${
          player.hp === 0 ? "" : "hidden"
        } absolute w-[900px] h-[500px] bg-white rounded-2xl shadow-2xl shadow-black flex items-center justify-center flex-col`}
      >
        <h1 className=" font-mono text-[100px] font-extrabold">GAME OVER</h1>
        <button
          onClick={() => (
            setPlayer({ hp: 100, playerName: "unnamed" }),
            setMatrix(new Array(30).fill(0).map(() => new Array(51).fill(0))),
            setCordinates({ x: 30, y: 26 })
          )}
          className=" px-[10px] hover:bg-green-400 active:bg-green-600 transition-all durati bg-green-500 rounded-lg text-white text-[26px]"
        >
          Restart
        </button>
      </div>
      <div className="w-[26%] h-[50px] flex border items-center justify-between font-bold text-white">
        <div>{player.playerName}</div>
        <div className="w-[400px] h-[15px] border border-black">
          <div
            className={`bg-red-500 h-full `}
            style={{ width: `${player.hp}%` }}
          ></div>
        </div>
        <div>{player.hp}%</div>
      </div>
      <div className="">
        {matrix.map((item: number[], indexX: number) => (
          <div className="flex">
            {item.map((item: number, indexY: number) => (
              <div
                className={`w-[25px] h-[25px] border ${
                  indexX + 1 === cordinates.x && indexY + 1 === cordinates.y
                    ? "bg-green-400"
                    : ""
                }`}
              >
                {traps[item] || item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
