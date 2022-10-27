#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod compress_images;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn compress(input_dir: &str) -> String {
    let response = compress_images::compress_image(input_dir);

    format!("{}", response)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, compress])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
