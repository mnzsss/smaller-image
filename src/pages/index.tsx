import * as React from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import classNames from 'classnames'
import { ConfigPanel } from '../components/ConfigPanel'
import { SelectFolderInput } from '../components/SelectFolderInput'
import { toast } from 'react-hot-toast'

export const DEFAULT_SCALE = 100
export const DEFAULT_QUALITY = 75

function App() {
  const [folderPath, setFolderPath] = React.useState('')

  const [quality, setQuality] = React.useState(DEFAULT_QUALITY)
  const [scale, setScale] = React.useState(DEFAULT_SCALE)

  const [loading, setLoading] = React.useState(false)

  const handleCompressFolderImages = React.useCallback(async () => {
    setLoading(true)

    try {
      const distPath = await invoke('compress', {
        inputDir: folderPath,
        quality: Number(quality.toFixed(2)),
        scale: Number((scale / 100).toFixed(2)),
      })

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-neutral shadow-lg border-neutral-focus border-2 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-1 ml-3">
                <p className="text-sm font-medium text-neutral-content">
                  Compressão realizada com sucesso!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l-2 border-neutral-focus">
            <button
              onClick={async () =>
                await invoke('show_in_folder', {
                  path: `${distPath}/`,
                })
              }
              className="flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg text-neutral-content hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Abrir Pasta
            </button>
          </div>
        </div>
      ))
    } catch (e) {
      toast.error('Erro ao comprimir, tente novamente.')
    } finally {
      handleResetConfig()
      setFolderPath('')
      setLoading(false)
    }
  }, [folderPath, quality, scale])

  function handleResetConfig() {
    setScale(DEFAULT_SCALE)
    setQuality(DEFAULT_QUALITY)
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-base-200">
      <header className="flex items-center justify-between w-full px-6 py-4 border-b-2 border-neutral">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          SMALLER IMAGES
        </h1>

        <p className="text-xs text-base-content">
          Now only rescale and compress to .jpg files from folder.
        </p>
      </header>

      <main className="grid h-full" style={{ gridTemplateColumns: '1fr 3fr' }}>
        <ConfigPanel
          quality={quality}
          scale={scale}
          onQualityChange={(e) => setQuality(e.target.valueAsNumber)}
          onScaleChange={(e) => setScale(e.target.valueAsNumber)}
          onResetConfig={handleResetConfig}
        />

        <section className="flex flex-col justify-between h-full">
          <SelectFolderInput
            folderPath={folderPath}
            onFolderSelect={(path) => setFolderPath(path)}
          />

          <section className="flex items-center justify-between px-6 py-4 border-t-2 bg-base-100 border-neutral">
            {folderPath ? (
              <button
                className={'btn btn-accent'}
                type="button"
                onClick={() => setFolderPath('')}
                disabled={!folderPath}
              >
                Selecionar outra pasta
              </button>
            ) : null}

            <button
              className={classNames('btn btn-primary', {
                loading,
              })}
              type="button"
              onClick={handleCompressFolderImages}
              disabled={!folderPath}
            >
              {loading ? 'Comprimindo Imagens...' : 'Comprimir Imagens'}
            </button>
          </section>
        </section>
      </main>
    </div>
  )
}

export default App
