import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

function App() {
  const [feedback, setFeedback] = useState("");
  const [folderPath, setFolderPath] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCompressFolderImages() {
    setLoading(true);
    setFeedback(
      await invoke("compress", {
        inputDir: folderPath || "./icons",
      })
    );
    setLoading(false);
  }

  async function handleGetFolderPath() {
    const filepath = (await open({
      directory: true,
    })) as string;

    setFolderPath(filepath.split("/").at(-1));
  }

  return (
    <div className="w-screen h-screen bg-stone-900 flex items-center justify-center flex-col">
      <h1 className="text-6xl text-transparent font-black bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        SMALLER IMAGES
      </h1>
      <p className="text-slate-200 mt-4">
        Now only rescale and compress to .jpg files
      </p>

      {loading ? (
        <p className="mt-12 text-white">Compressing...</p>
      ) : (
        <>
          <div className="flex mt-12">
            <button
              className="bg-purple-600 rounded-full mr-6 text-slate-50 font-medium px-6 py-2 hover:bg-purple-800 transition-all"
              onClick={handleGetFolderPath}
            >
              Get Folder
            </button>

            <button
              className="bg-purple-600 rounded-full text-slate-50 font-medium px-6 py-2 hover:bg-purple-800 transition-all"
              type="button"
              onClick={handleCompressFolderImages}
            >
              Compress
            </button>
          </div>

          {folderPath ? (
            <p className="mt-12 text-white">Folder: {folderPath}</p>
          ) : null}

          <p className="mt-16 text-white font-bold">{feedback}</p>
        </>
      )}
    </div>
  );
}

export default App;
