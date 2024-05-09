use rusqlite::Connection;
use tauri::{AppHandle, State, Manager};

pub struct AppState {
    pub db: std::sync::Mutex<Option<Connection>>,
  }


  pub trait ServiceAccess {
    fn db<F, TResult>(&self, operation: F) -> TResult where F: FnOnce(&Connection) -> TResult;
    // fn db_mut<F, TResult>(&self, operation: F) -> TResult where F: FnOnce(&mut Connection) -> TResult;
  }