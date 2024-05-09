// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod state;
mod database;

use tauri::{Manager, State};
use state::{AppState};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str, window: tauri::Window) -> String {
    println!("Window: {}", window.available_monitors().unwrap().len());
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_title(state: tauri::State<AppState>) -> String {
    return String::from('s');
}

#[tauri::command]
fn get_monitor() -> String {
    return String::from("nie")
}


fn main() {

    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            let app_state: State<AppState> = handle.state();
            let db = database::initialize_database(&handle).expect("Database initialize should succeed");
            *app_state.db.lock().unwrap() = Some(db);

            // Ok(())
            
            let window = app.get_window("main").unwrap();
            std::thread::spawn(move || {
                println!("This will print!");
                let _monitors = window.available_monitors().unwrap();
                println!("This will print! ${}", _monitors.len());
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_title,get_monitor])
        .manage( AppState { db: Default::default() })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
