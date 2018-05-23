import { store } from '../_store/store'
import { muteConversation, unmuteConversation } from '../_api/muteConversation'
import { toast } from '../_utils/toast'
import { setStatusMuted as setStatusMutedInDatabase } from '../_database/timelines/updateStatus'

export async function setConversationMuted (statusId, mute, toastOnSuccess) {
  let { currentInstance, accessToken } = store.get()
  try {
    if (mute) {
      await muteConversation(currentInstance, accessToken, statusId)
    } else {
      await unmuteConversation(currentInstance, accessToken, statusId)
    }
    await setStatusMutedInDatabase(currentInstance, statusId, mute)
    if (toastOnSuccess) {
      if (mute) {
        toast.say('Wyciszono konwersację')
      } else {
        toast.say('Cofnięto wyciszenie konwersacji')
      }
    }
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się ${mute ? 'wyciszyć' : 'cofnąć wyciszenia'} konwersacji: ` + (e.message || ''))
  }
}
