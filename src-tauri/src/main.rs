// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str, window: tauri::Window) -> String {
    println!("Window: {}", window.available_monitors().unwrap().len());
    format!("Hello, {}! You've been greeted from Rust!", name)
}

struct Monitor {
    title: String
}

#[tauri::command]
fn get_title(state: tauri::State<Monitor>) -> String {
    println!("hello {}", state.title);
    return String::from('s');
}

#[tauri::command]
fn get_monitor() -> String {
    return String::from("nie")
}


fn main() {
    
    tauri::Builder::default()
        .setup(|app| {
            // let main_window = app.get_window("main").unwrap();
            let window = app.get_window("main").unwrap();
            std::thread::spawn(move || {
                println!("This will print!");
                let _monitors = window.available_monitors().unwrap();
                println!("This will print! ${}", _monitors.len());
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_title,get_monitor])
        .manage(Monitor{title: "ss".to_string()})
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
