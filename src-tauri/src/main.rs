#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod compress_images;
use std::fs;

#[tauri::command]
fn compress(input_dir: &str) -> String {
    let response = compress_images::compress_image(input_dir);

    format!("{}", response)
}

#[tauri::command]
fn folder(input_dir: &str) {
    let paths = fs::read_dir(input_dir).unwrap();

    for path in paths {
        println!("Name: {}", path.unwrap().path().display())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compress, folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
