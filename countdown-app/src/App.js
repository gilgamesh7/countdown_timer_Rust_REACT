import React, { useEffect, useState } from 'react';

function App() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    async function loadWasm() {
      // Fetch the WASM file from the public folder
      const response = await fetch('/pkg/countdown_bg.wasm');
      // Define imports for the WebAssembly instance
      const imports = {
        wbg: {
          __wbg_getTime_41225036a0393d63: () => new Date().getTime(), 
          __wbg_new0_218ada33b570be35: () => {},
          __wbindgen_throw: () => {},
          __wbindgen_init_externref_table: () => {},
        },
        env: {
          memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }), // The WASM module expects a 'memory' import
          __wbindgen_export_0: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }), // The WASM module expects a table import
          __wbindgen_free: (a, b, c) => { /* Custom free function logic here, if needed */ },
        },
      };

      // Instantiate the WebAssembly module with imports
      const { instance } = await WebAssembly.instantiateStreaming(response, imports);
      // console.log('WASM Exports:', instance.exports);

      // Update every second
      const interval = setInterval(() => {
        updateCountdown(instance.exports);
      }, 1000);

      // Cleanup on component unmount
      return ()=> clearInterval(interval);
    }

    loadWasm();
  }, []);

  async function updateCountdown(wasmExports) {
    const result = wasmExports.calculate_time_left();
    setCountdown(result);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Countdown to 13/12/2024 23:30 NZST</h1>
      <h2>{countdown}</h2>
    </div>
  );
}

export default App;



  