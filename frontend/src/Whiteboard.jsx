import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://colaborative-whiteboard.onrender.com");
const CANVAS_BG_COLOR = "#ffffff";

function Whiteboard({ roomId }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  const [color, setColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(4);
  const [mode, setMode] = useState("draw");

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: CANVAS_BG_COLOR,
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = brushWidth;
    fabricCanvasRef.current = canvas;

    socket.emit("join-room", roomId);

    const handleCanvasData = (data) => {
      canvas.loadFromJSON(data, () => {
        canvas.backgroundColor = CANVAS_BG_COLOR;
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = mode === "erase" ? CANVAS_BG_COLOR : color;
        canvas.freeDrawingBrush.width = brushWidth;
        canvas.renderAll();
      });
    };

    socket.on("canvas-data", handleCanvasData);

    canvas.on("path:created", () => {
      const json = canvas.toJSON();
      socket.emit("canvas-data", json);
    });

    return () => {
      socket.off("canvas-data", handleCanvasData);
      canvas.dispose();
    };
  }, [roomId]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.freeDrawingBrush.color = mode === "erase" ? CANVAS_BG_COLOR : color;
    canvas.freeDrawingBrush.width = brushWidth;
  }, [color, brushWidth, mode]);

  const clearCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = CANVAS_BG_COLOR;
      socket.emit("canvas-data", canvas.toJSON());
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/*  Nav Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-900 px-6 py-4 shadow-md">
        <h2 className="text-white text-xl font-semibold tracking-wide">
          Collaborative Whiteboard | Room: {roomId}
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <label className="text-sm">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2 text-white">
            <label className="text-sm">Brush</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushWidth}
              onChange={(e) => setBrushWidth(parseInt(e.target.value))}
              className="accent-blue-200"
            />
          </div>

          <button
            onClick={() => setMode("draw")}
            className={`px-4 py-1.5 rounded text-sm font-medium ${
              mode === "draw"
                ? "bg-slate-100 text-gray-900"
                : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            Draw
          </button>

          <button
            onClick={() => setMode("erase")}
            className={`px-4 py-1.5 rounded text-sm font-medium ${
              mode === "erase"
                ? "bg-slate-100 text-gray-900"
                : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            Erase
          </button>

          <button
            onClick={clearCanvas}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 80}
        className="block "
      />
    </div>
  );
}

export default Whiteboard;
