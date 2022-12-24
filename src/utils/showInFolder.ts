import { tauri } from '@tauri-apps/api'

export async function showInFolder(path: string) {
  await tauri.invoke('show_in_folder', { path })
}
