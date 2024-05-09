import { emit } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import {
  WebviewWindow,
  appWindow,
  availableMonitors,
  currentMonitor,
  getCurrent,
} from "@tauri-apps/api/window";
import { useEffect } from "react";
function App() {
  const audience = async () => {
    const webview = new WebviewWindow("theUniqueLabel", {
      url: "nested/index.html?q=1",
      title: "Show",
    });

    const aa = await currentMonitor();
    console.log(aa);
  };

  useEffect(() => {}, []);


  const emitEvents = async (data, e) => {
    // const d = new Date();
    // console.log(data, e)
    await invoke('get_monitor');
    emit("content_changes", {
      slideType: "",
      clickAt: new Date().toISOString(), 
      song: data.text,
    });
  };

  const sampleSlides = [1,2,3,4,5];
  return (
    <div className="bg_hitam h-screen w-full">
      <div id="navbar" className="grid grid-cols-3">
        <div>ss</div>
        <div>
          <p>ss</p>
        </div>
        <div>
         
        <button
          onClick={audience}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Live
        </button>
        </div>
      </div>
      <section>
        <div className="flex">
          <div className="w-3/12 bg-white">
            <b>Show</b>
            <ul>
              <li>Song / Slides</li>
            </ul>
          </div>
          <div className="w-6/12 bg-white border">
            {/* <b>Slides</b> */}
            <div className="gap-10 grid grid-cols-4">
              {sampleSlides.map((x) => (
                <div key={x} className="border-solid border-2 border-black p-1 cursor-pointer" onClick={(e) => emitEvents({slideType: 'song', text: x}, e)}>
                  <div>preview</div>
                  <div className="bg-blue-400 flex">
                    <b className="mr-2">{x}</b>
                    <p>Note Verse</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/12 bg-white">
            <p>live</p>
          </div>
        </div>
      </section>
      <div className="px-2 py-2">
        {/* <button onClick={null}>Emit</button>
        <ul>
          <li onClick={null}>
            <p>Reff</p>
          </li>
          <li onClick={(e) => emitEvents({slideType: 'song', text: 'nipe'}, e)}>
            <p>Reff</p>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

export default App;
