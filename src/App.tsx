import { useEffect, useState } from "react";

const App = () => {
  const [matrix, setMatrix] = useState<number[][]>(
    new Array(10).fill(0).map(() => new Array(10).fill(0))
  );
  const [cordinates, setCordinates] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });
  const [player, setPlayer] = useState({ hp: 100, playerName: "unnamed" });
  useEffect(() => {
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
            if (cordinates.x === 10) return;
            setCordinates((prev) => ({
              ...prev,
              x: prev.x === 10 ? prev.x : prev.x + 1,
            }));
            const updatedMatrix = [...matrix];
            updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 1;
            setMatrix(updatedMatrix);
          } else {
            setCordinates((prev) => ({
              ...prev,
              x: prev.x === 10 ? prev.x : prev.x + 1,
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
            if (cordinates.y === 10) return;
            setCordinates((prev) => ({
              ...prev,
              y: prev.y === 10 ? prev.y : prev.y + 1,
            }));
            const updatedMatrix = [...matrix];
            updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 1;
            setMatrix(updatedMatrix);
          } else {
            setCordinates((prev) => ({
              ...prev,
              y: prev.y === 10 ? prev.y : prev.y + 1,
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
  }, [cordinates, matrix]);
  useEffect(() => {
    if (matrix[cordinates.x - 1][cordinates.y - 1] === 1) {
      setPlayer((prev: any) => ({ ...prev, hp: prev.hp - 25 }));
      const updatedMatrix = [...matrix];
      updatedMatrix[cordinates.x - 1][cordinates.y - 1] = 0; // yoki 0 ga tenglashi kerak
      setMatrix(updatedMatrix);
    }
  }, [cordinates, matrix, player]);

  return (
    <div className=" w-screen h-screen bg-slate-500 flex items-center justify-center flex-col">
      <div className="w-[26%] h-[50px] flex border items-center justify-between font-bold text-white">
        <div>{player.playerName}</div>
        <div className="w-[400px] h-[15px] border border-black">
          <div
            className={`bg-red-500 h-full `}
            style={{ width: `${player.hp}%` }}
          >
            {player.hp}
          </div>
        </div>
      </div>
      <div className="">
        {matrix.map((item: number[], indexX: number) => (
          <div className="flex">
            {item.map((item: number, indexY: number) => (
              <div
                className={`w-[50px] h-[50px] border ${
                  indexX + 1 === cordinates.x && indexY + 1 === cordinates.y
                    ? "bg-green-400"
                    : item === 1
                    ? "bg-red-500"
                    : ""
                }`}
              >
                {indexX + 1}|{indexY + 1}|{item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
