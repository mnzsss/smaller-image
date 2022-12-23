import { DEFAULT_COMPRESSION, DEFAULT_SCALE } from "../pages";

export function ConfigPanel({
  compression,
  scale,
  onCompressionChange,
  onScaleChange,
  onResetConfig,
}) {
  const enableReset =
    DEFAULT_SCALE === scale && DEFAULT_COMPRESSION === compression;

  return (
    <aside className="flex flex-col h-full px-6 py-4 border-r-2 border-neutral">
      <span className="font-medium text-md text-base-content">
        Configurações
      </span>

      <div className="m-0 divider"></div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="block text-xs text-neutral-content">Compressão</span>
          <span className="text-sm font-bold text-base-content">
            {compression}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={compression}
          className="range range-primary range-sm"
          step="25"
          onChange={onCompressionChange}
        />
        <div className="flex justify-between w-full px-2 mt-1 text-xs">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <div className="my-6 divider"></div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="block text-xs text-neutral-content">
            Tamanho das Imagens
          </span>
          <span className="text-sm font-bold text-base-content">{scale}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={scale}
          className="range range-primary range-sm"
          step="1"
          onChange={onScaleChange}
        />
        <div className="flex justify-between w-full px-2 mt-1 text-xs">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <button
        className="mt-auto btn btn-accent"
        type="button"
        onClick={onResetConfig}
        disabled={enableReset}
      >
        Resetar
      </button>
    </aside>
  );
}
