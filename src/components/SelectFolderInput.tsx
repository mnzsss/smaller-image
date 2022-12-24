import { FolderIcon } from "@heroicons/react/24/outline";
import { open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";

export function SelectFolderInput({ folderPath, onFolderSelect }) {
  const [images, setImages] = useState([]);

  async function handleGetFolderPath() {
    try {
      const filepath = (await open({
        directory: true,
        title: "Selecionar pasta de imagens",
      })) as string;

      onFolderSelect(filepath);

      const entries = (await readDir(filepath)).filter(
        (path) => path.name.endsWith(".jpg") || path.name.endsWith(".jpeg")
      );

      setImages(entries);
    } catch (e) {}
  }

  useEffect(() => {
    if (!folderPath) {
      setImages([]);
    }
  }, [folderPath]);

  return (
    <section className="h-full px-6 py-4">
      <div className="flex items-center justify-between w-full">
        <span className="font-medium text-md text-base-content">
          {images.length ? "Arquivos da Pasta" : "Selecionar Pasta"}
        </span>

        {!!folderPath ? (
          <span className="flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-blue-500" />
            <strong>{folderPath}</strong>
          </span>
        ) : null}
      </div>

      <div className="m-0 mb-6 divider"></div>

      {images.length ? (
        <ul className="w-full overflow-y-scroll h-full max-h-[344px]">
          {images.map((image) => (
            <li className="w-full py-4 border-b-2 rounded-t-lg border-neutral">
              {image.name}
            </li>
          ))}
        </ul>
      ) : (
        <button
          className="flex items-center justify-center w-full h-24 gap-2 duration-300 ease-linear border-2 rounded-md hover:opacity-70 bg-base-100 border-neutral"
          onClick={handleGetFolderPath}
        >
          <FolderIcon className="w-6 h-6 text-blue-500" />
          <span className="text-base-content">
            Clique para selecionar sua pasta
          </span>
        </button>
      )}
    </section>
  );
}
