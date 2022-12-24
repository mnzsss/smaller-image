use image_compressor::Factor;
use image_compressor::FolderCompressor;
use std::path::PathBuf;
use std::sync::mpsc;

pub fn compress_image<'a>(input_dir: &'a str) -> String {
    let origin = PathBuf::from(input_dir); // original directory path
    let dest_path: String = format!("{}-{}", input_dir, "results");
    let dest = PathBuf::from(dest_path); // destination directory path
    let thread_count = 4; // number of threads
    let (tx, _) = mpsc::channel(); // Sender and Receiver. for more info, check mpsc and message passing.

    let mut comp = FolderCompressor::new(origin, dest);
    comp.set_cal_func(|_, _, _| return Factor::new(75., 1.0));
    comp.set_thread_count(thread_count);
    comp.set_sender(tx);

    match comp.compress() {
        Ok(_) => format!("{}-{}", input_dir, "results"),
        Err(e) => {
            println!("Cannot compress the folder!: {}", e);

            return format!("Error");
        }
    }
}
