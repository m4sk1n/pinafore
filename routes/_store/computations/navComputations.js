export function navComputations (store) {
  store.compute(
    'pinnedListTitle',
    ['lists', 'pinnedPage'],
    (lists, pinnedPage) => {
      if (!pinnedPage.startsWith('/lists')) {
        return
      }
      let listId = pinnedPage.split('/').slice(-1)[0]
      let list = lists.find(_ => _.id === listId)
      return list ? list.title : ''
    }
  )

  store.compute(
    'navPages',
    ['pinnedPage', 'pinnedListTitle'],
    (pinnedPage, pinnedListTitle) => {
      let pinnedPageObject
      if (pinnedPage === '/federated') {
        pinnedPageObject = {
          name: 'federated',
          href: '/federated',
          svg: '#fa-globe',
          label: 'Oś czasu federacji'
        }
      } else if (pinnedPage === '/favorites') {
        pinnedPageObject = {
          name: 'favorites',
          href: '/favorites',
          svg: '#fa-star',
          label: 'Ulubione'
        }
      } else if (pinnedPage.startsWith('/lists/')) {
        pinnedPageObject = {
          name: `lists/${pinnedPage.split('/').slice(-1)[0]}`,
          href: pinnedPage,
          svg: '#fa-bars',
          label: pinnedListTitle
        }
      } else { // local
        pinnedPageObject = {
          name: 'local',
          href: '/local',
          svg: '#fa-users',
          label: 'Lokalna oś czasu'
        }
      }

      return [
        {
          name: 'home',
          href: '/',
          svg: '#pinafore-logo',
          label: 'Strona główna'
        },
        {
          name: 'notifications',
          href: '/notifications',
          svg: '#fa-bell',
          label: 'Powiadomienia'
        },
        pinnedPageObject,
        {
          name: 'community',
          href: '/community',
          svg: '#fa-comments',
          label: 'Społeczność'
        },
        {
          name: 'search',
          href: '/search',
          svg: '#fa-search',
          label: 'Wyszukiwanie'
        },
        {
          name: 'settings',
          href: '/settings',
          svg: '#fa-gear',
          label: 'Ustawienia'
        }
      ]
    }
  )
}
