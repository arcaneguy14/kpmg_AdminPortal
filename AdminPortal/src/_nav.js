export default {
  items: [
    {
      title: true,
      name: 'Base',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name : 'User Management',
      url: '/main/users',
      icon : 'fa fa-users'
    },
    {
      title: true,
      name: 'KPMG APP',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name : 'Features',
      url: '/main/features',
      icon : 'cui-layers'
    },
    {
      name : 'Insights',
      url: '/main/insights',
      icon : 'cui-layers'
    },
    {
      name : 'Services',
      url: '/main/services',
      icon : 'cui-layers'
    },
    {
      name : 'Industries',
      url: '/main/industries',
      icon : 'cui-layers'
    },
    {
      name : 'About',
      url: '/main/abouts',
      icon : 'cui-layers'
    },
    {
      name : 'Career',
      url: '/main/career',
      icon : 'cui-layers',
      children: [
        {
          name: 'Career Articles',
          url: '/main/career/career_articales',
          icon: 'icon-puzzle'
        },
        {
          name: 'Career Jobs',
          url: '/main/career/career_jobs',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      title: true,
      name: 'Event APP',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name : 'Event',
      url: '/main/events',
      icon : 'cui-layers'
    },
    {
      name : 'Event Feeds',
      url: '/main/events_feeds',
      icon : 'cui-layers'
    },
  ]
}
