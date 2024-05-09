import { Event, listen } from "@tauri-apps/api/event";
import {
  LogicalPosition,
  appWindow,
  availableMonitors,
  getCurrent,
} from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

const Screen = () => {

  const handleit = async (x: Event<any>) => {
    console.log('s', x)
    setSlide(x.payload.song)
  }

  const [slide, setSlide] = useState('');

  useEffect(() => {
    const unlisten = listen('content_changes', handleit);
    
    return () => {
      unlisten.then( f => f() );
    }
  }, []);

  useEffect(() => {
    const abc = async () => {
      const monitors = await availableMonitors();

      if (monitors.length < 2) {
        return;
      }

      const secondaryMonitors = monitors.filter(
        (x) => x.name != "Monitor #41039",
      );

      if (secondaryMonitors.length < 1) {
        return;
      }

      const secondaryMonitor = secondaryMonitors[0];

      await appWindow.setPosition(
        new LogicalPosition(
          secondaryMonitor.position.x,
          secondaryMonitor.position.y,
        ),
      );
      await appWindow.setFullscreen(true);
    };
    abc();
  }, []);
  return (
    <>
      <div className="bg-black mx-auto">
        <div className="flex h-screen justify-center items-center text-white">
          <div className="font-size-4xl text-center" style={{fontSize: 'calc(5vw + 6vh)'}}>
            {/* <p>Terpujilah namaMu Tuhan
Kuat dan penuh kemuliaan</p>
            <p>Terpujilah namaMu Tuhans
Kuat dan penuh kemuliaan</p> */}
            <p>{slide}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen;
