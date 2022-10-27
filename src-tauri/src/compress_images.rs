use image_compressor::Factor;
use image_compressor::FolderCompressor;
use std::path::PathBuf;
use std::sync::mpsc;

pub fn compress_image<'a>(input_dir: &'a str) -> &'a str {
    let origin = PathBuf::from(input_dir); // original directory path
    let dest = PathBuf::from(format!("{}-{}", input_dir, "results")); // destination directory path
    let thread_count = 4; // number of threads
    let (tx, _) = mpsc::channel(); // Sender and Receiver. for more info, check mpsc and message passing.

    let mut comp = FolderCompressor::new(origin, dest);
    comp.set_cal_func(|_, _, _| return Factor::new(75., 1.0));
    comp.set_thread_count(thread_count);
    comp.set_sender(tx);

    match comp.compress() {
        Ok(_) => "Success",
        Err(e) => {
            println!("Cannot compress the folder!: {}", e);

            return "Error";
        }
    }
}
