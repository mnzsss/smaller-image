use image_compressor::Factor;
use image_compressor::FolderCompressor;
use std::path::PathBuf;
use std::sync::mpsc;

pub fn compress_folder_images<'a>(input_dir: &'a str, quality: f32, scale: f32) -> String {
    print!("quality: {}, scale: {}", quality, scale);

    let origin = PathBuf::from(input_dir); // original directory path
    let dest_path: String = format!("{}-{}", input_dir, "results");
    let dest = PathBuf::from(dest_path); // destination directory path
    let thread_count = 4; // number of threads
    let (tx, _) = mpsc::channel(); // Sender and Receiver. for more info, check mpsc and message passing.

    let compressor_config_factor = Factor::new(quality, scale);

    let mut comp = FolderCompressor::new(origin, dest);
    comp.set_factor(compressor_config_factor);
    comp.set_thread_count(thread_count);
    comp.set_sender(tx);

    match comp.compress() {
        Ok(_) => format!("{}-{}", input_dir, "results/"),
        Err(e) => {
            println!("Cannot compress the folder!: {}", e);

            return format!("Cannot compress the folder!: {}", e);
        }
    }
}
