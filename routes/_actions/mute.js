import { store } from '../_store/store'
import { muteAccount, unmuteAccount } from '../_api/mute'
import { toast } from '../_utils/toast'
import { updateProfileAndRelationship } from './accounts'
import { emit } from '../_utils/eventBus'

export async function setAccountMuted (accountId, mute, toastOnSuccess) {
  let { currentInstance, accessToken } = store.get()
  try {
    if (mute) {
      await muteAccount(currentInstance, accessToken, accountId)
    } else {
      await unmuteAccount(currentInstance, accessToken, accountId)
    }
    await updateProfileAndRelationship(accountId)
    if (toastOnSuccess) {
      if (mute) {
        toast.say('Wyciszono konto')
      } else {
        toast.say('Cofnięto wyciszenie konta')
      }
    }
    emit('refreshAccountsList')
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się ${mute ? 'wyciszyć' : 'cofnąć wyciszenia'} konta: ` + (e.message || ''))
  }
}
