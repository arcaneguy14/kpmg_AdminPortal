export default {
  items: [
    {
      title: true,
      name: 'Switch Mode',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name : 'Switch to Event Mode',
      url: '/event',
      class: 'small',
      icon: 'fa fa-arrow-left'
    },
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
      url: '/kpmg/users',
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
      url: '/kpmg/features',
      icon : 'cui-layers'
    },
    {
      name : 'Insights',
      url: '/kpmg/insights',
      icon : 'cui-layers'
    },
    {
      name : 'Services',
      url: '/kpmg/services',
      icon : 'cui-layers'
    },
    {
      name : 'Industries',
      url: '/kpmg/industries',
      icon : 'cui-layers'
    },
    {
      name : 'About',
      url: '/kpmg/abouts',
      icon : 'cui-layers'
    },
    {
      name : 'Career',
      url: '/kpmg/career',
      icon : 'cui-layers',
      children: [
        {
          name: 'Career Articles',
          url: '/kpmg/career/career_articales',
          icon: 'icon-puzzle'
        },
        {
          name: 'Career Jobs',
          url: '/kpmg/career/career_jobs',
          icon: 'icon-puzzle'
        }
      ]
    }
  ]
}
