# countdown_timer_Rust_REACT
A a website that displays a countdown timer in hours and days, till 13/12/2024 2330 hrs
1. Rust (WASM) Code: This will handle the countdown calculations and compile to WebAssembly (WASM) to work within a React frontend. 
1. React Frontend: This will display the countdown and run entirely in the browser.

# Instructions
## Development
- Install Rust : curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
- Install wasm-pack : cargo install wasm-pack
- Create new project : cargo new countdown
- Add dependencies :
    - cargo add wasm-bindgen
    - cargo add chrono --features "serde"
- Compile to web : wasm-pack build --target web