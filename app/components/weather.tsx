"use client";

import { useEffect, useState } from "react";

const weatherDescriptions: Record<number, string> = {
  0: "Beaut day",
  1: "Pretty choice out",
  2: "Bit of cloud, she'll be right",
  3: "Cloudy as, bro",
  45: "Thick as fog",
  48: "Pea souper",
  51: "Bit of a spit",
  53: "Drizzly as",
  55: "Chucking it down",
  56: "Icy spit",
  57: "Icy spit",
  61: "Light rain, stay inside",
  63: "Raining sideways",
  65: "Bucketing down",
  66: "Freezing rain, awful",
  67: "Freezing rain, brutal",
  71: "Bit of snow, sweet as",
  73: "Snowing heaps",
  75: "Proper blizzard, bro",
  77: "Hail, crikey",
  80: "Few showers, she'll pass",
  81: "Showery as",
  82: "Absolute deluge",
  85: "Snow showers, mint",
  86: "Snow dumping",
  95: "Gnarly storm",
  96: "Mean as storm",
  99: "Full-on cyclone, bro",
};

export default function Weather() {
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,weather_code"
    )
      .then((res) => res.json())
      .then((data) => {
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code as number;
        const desc = weatherDescriptions[code] ?? "Unknown";
        setWeather(`${temp}°C, ${desc}`);
      })
      .catch(() => {});
  }, []);

  if (!weather) return null;

  return (
    <div className="fixed bottom-6 right-6 text-[10px] text-[#8c877d]">
      London — {weather}
    </div>
  );
}
