import { store } from '../_store/store'
import { followAccount, unfollowAccount } from '../_api/follow'
import { toast } from '../_utils/toast'
import { updateProfileAndRelationship } from './accounts'
import {
  getRelationship as getRelationshipFromDatabase
} from '../_database/accountsAndRelationships'

export async function setAccountFollowed (accountId, follow, toastOnSuccess) {
  let { currentInstance, accessToken } = store.get()
  try {
    let account
    if (follow) {
      account = await followAccount(currentInstance, accessToken, accountId)
    } else {
      account = await unfollowAccount(currentInstance, accessToken, accountId)
    }
    await updateProfileAndRelationship(accountId)
    let relationship = await getRelationshipFromDatabase(currentInstance, accountId)
    if (toastOnSuccess) {
      if (follow) {
        if (account.locked && relationship.requested) {
          toast.say('Wysłano prośbę o śledzenie')
        } else {
          toast.say('Zacząłeś śledzić konto')
        }
      } else {
        toast.say('Przestałeś śledzić konto')
      }
    }
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się ${follow ? 'zacząć śledzić' : 'przestać śledzić'} konta: ` + (e.message || ''))
  }
}
