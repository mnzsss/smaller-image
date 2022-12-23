import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import classNames from "classnames";
import { ConfigPanel } from "../components/ConfigPanel";
import { SelectFolderInput } from "../components/SelectFolderInput";
import { toast } from "react-hot-toast";

export const DEFAULT_SCALE = 100;
export const DEFAULT_COMPRESSION = 75;

function App() {
  const [feedback, setFeedback] = useState("");
  const [folderPath, setFolderPath] = useState("");

  const [compression, setCompression] = useState(DEFAULT_COMPRESSION);
  const [scale, setScale] = useState(DEFAULT_SCALE);

  const [loading, setLoading] = useState(false);

  async function handleCompressFolderImages() {
    setLoading(true);

    try {
      setFeedback(
        await invoke("compress", {
          inputDir: folderPath || "./icons",
        })
      );

      toast.success("Compressão realizada com sucesso!");

      setFolderPath("");
    } catch (e) {
      setFeedback(e.message);
      toast.success("Erro ao comprimir, tente novamente.");
    } finally {
      handleResetConfig();
      setLoading(false);
    }
  }

  function handleResetConfig() {
    setScale(DEFAULT_SCALE);
    setCompression(DEFAULT_COMPRESSION);
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-base-200">
      <header className="flex items-center justify-between w-full px-6 py-4 border-b-2 border-neutral">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          SMALLER IMAGES
        </h1>

        <p className="text-xs text-base-content">
          Now only rescale and compress to .jpg files from folder.
        </p>
      </header>

      <main className="grid h-full" style={{ gridTemplateColumns: "1fr 3fr" }}>
        <ConfigPanel
          compression={compression}
          scale={scale}
          onCompressionChange={(e) => setCompression(e.target.valueAsNumber)}
          onScaleChange={(e) => setScale(e.target.valueAsNumber)}
          onResetConfig={handleResetConfig}
        />

        <section className="flex flex-col justify-between h-full">
          <SelectFolderInput
            folderPath={folderPath}
            onFolderSelect={(path) => setFolderPath(path)}
          />

          <section className="flex items-center justify-between px-6 py-4 border-t-2 bg-base-100 border-neutral">
            {!!folderPath ? (
              <button
                className={"btn btn-accent"}
                type="button"
                onClick={() => setFolderPath("")}
                disabled={!folderPath}
              >
                Selecionar outra pasta
              </button>
            ) : null}

            <button
              className={classNames("btn btn-primary", {
                ["loading"]: loading,
              })}
              type="button"
              onClick={handleCompressFolderImages}
              disabled={!folderPath}
            >
              {loading ? "Comprimindo Imagens..." : "Comprimir Imagens"}
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
