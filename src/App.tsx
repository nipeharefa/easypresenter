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
  return (
    <div className="container">
      <div>navbar</div>
      <section>
        content
      </section>
      <div className="px-2 py-2">
        <button onClick={null}>Emit</button>
        <ul>
          <li onClick={(e) => emitEvents({slideType: 'song', text: 's'}, e)}>
            <p>Reff</p>
          </li>
          <li onClick={(e) => emitEvents({slideType: 'song', text: 'nipe'}, e)}>
            <p>Reff</p>
          </li>
        </ul>
        <button
          onClick={audience}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Click me
        </button>
      </div>
    </div>
  );
}

export default App;
