import { favoriteStatus, unfavoriteStatus } from '../_api/favorite'
import { store } from '../_store/store'
import { toast } from '../_utils/toast'
import {
  setStatusFavorited as setStatusFavoritedInDatabase
} from '../_database/timelines/updateStatus'

export async function setFavorited (statusId, favorited) {
  let { online } = store.get()
  if (!online) {
    toast.say(`Nie możesz ${favorited ? 'dodać do ulubionych' : 'usunąć z ulubionych'}, kiedy jesteś offline.`)
    return
  }
  let { currentInstance, accessToken } = store.get()
  let networkPromise = favorited
    ? favoriteStatus(currentInstance, accessToken, statusId)
    : unfavoriteStatus(currentInstance, accessToken, statusId)
  store.setStatusFavorited(currentInstance, statusId, favorited) // optimistic update
  try {
    await networkPromise
    await setStatusFavoritedInDatabase(currentInstance, statusId, favorited)
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się ${favorited ? 'dodać do ulubionych' : 'usunąć z ulubionych'}. ` + (e.message || ''))
    store.setStatusFavorited(currentInstance, statusId, !favorited) // undo optimistic update
  }
}
