// import Weather from "./components/weather";
// import PillNav from "./components/pill-nav";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* <PillNav /> */}
      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div>

          <div className="flex items-end justify-between">
            <h1 className="text-[22px] font-medium text-black">
              Rishi Samuel Patel
            </h1>
            <img
              src="/Habbo_Rishi.png"
              alt="Avatar"
              width={Math.round(64 * 1.75 * 0.75)}
              height={Math.round(64 * 1.75 * 0.75)}
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <p className="text-[18px] text-[#8c877d] leading-[1.7] mt-[1em]">
            Welcome to my corner of the internet.
          </p>
          <a href="mailto:chat@rsp.lol" className="text-[18px] text-[#8c877d] underline underline-offset-4 mt-[1em] inline-block transition-colors duration-500 hover:text-black">Email me</a>
        </div>
      </div>
      {/* <Weather /> */}
    </main>
  );
}
