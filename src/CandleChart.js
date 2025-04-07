import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  Line,
  Legend,
} from "recharts";

// 🧪 Fake Candle Data (OHLC)
const data = [
  { time: "10:00", open: 100, high: 110, low: 95, close: 105 },
  { time: "10:30", open: 105, high: 115, low: 100, close: 110 },
  { time: "11:00", open: 110, high: 120, low: 105, close: 115 }, // Bullish Engulfing
  { time: "11:30", open: 115, high: 117, low: 114, close: 115 }, // Doji
  { time: "12:00", open: 115, high: 118, low: 100, close: 102 }, // Hammer
];

// 💡 Recognize Basic Candlestick Patterns
function getPattern(candle) {
  const body = Math.abs(candle.open - candle.close);
  const range = candle.high - candle.low;

  if (body < 1 && range > 3) return "Doji";
  if (candle.close < candle.open && candle.low <= candle.open - 10)
    return "Hammer";
  if (candle.close > candle.open && body > 5) return "Bullish Engulfing";

  return null;
}

function CandleChart() {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      margin: "20px auto",
      maxWidth: "900px"
    }}>
      <h2 style={{
        color: "#0c1c8c",
        textAlign: "center",
        marginBottom: "20px"
      }}>🕯️ Candlestick Pattern Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            formatter={(value, name) => [value, name.toUpperCase()]}
            contentStyle={{ backgroundColor: "#0c1c8c", color: "#fff" }}
          />
          <Legend />
          <Bar
            dataKey={(d) => Math.abs(d.close - d.open)}
            fill="#febd11"
            isAnimationActive={false}
            name="Body"
          />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#00b300"
            dot={false}
            name="High"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#e60000"
            dot={false}
            name="Low"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <ul style={{
        marginTop: "20px",
        color: "#0c1c8c",
        fontWeight: "500",
        listStyle: "none",
        padding: "0"
      }}>
        {data.map((d, index) => {
          const pattern = getPattern(d);
          return (
            pattern && (
              <li key={index} style={{ marginBottom: "8px" }}>
                <strong>{d.time}</strong>: {pattern} Pattern 📊
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}

export default CandleChart;
