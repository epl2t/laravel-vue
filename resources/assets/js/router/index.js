import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '../containers/Full'

// Views
import Dashboard from '../views/Dashboard'

import Languages from '../views/settings/Languages'
import Authors from '../views/settings/Authors'
import Categories from '../views/settings/Categories'
import Collections from '../views/settings/Collections'
import Images from '../views/images/Images'

import Colors from '../views/theme/Colors'
import Typography from '../views/theme/Typography'

import Charts from '../views/Charts'
import Widgets from '../views/Widgets'

// Views - Components
import Cards from '../views/base/Cards'
import Forms from '../views/base/Forms'
import Switches from '../views/base/Switches'
import Tables from '../views/base/Tables'
import Breadcrumbs from '../views/base/Breadcrumbs'
import Carousels from '../views/base/Carousels'
import Collapses from '../views/base/Collapses'
import Jumbotrons from '../views/base/Jumbotrons'
import ListGroups from '../views/base/ListGroups'
import Navs from '../views/base/Navs'
import Navbars from '../views/base/Navbars'
import Paginations from '../views/base/Paginations'
import Popovers from '../views/base/Popovers'
import ProgressBars from '../views/base/ProgressBars'
import Tooltips from '../views/base/Tooltips'

// Views - Buttons
import StandardButtons from '../views/buttons/StandardButtons'
import ButtonGroups from '../views/buttons/ButtonGroups'
import Dropdowns from '../views/buttons/Dropdowns'
import SocialButtons from '../views/buttons/SocialButtons'

// Views - Icons
import Flags from '../views/icons/Flags'
import FontAwesome from '../views/icons/FontAwesome'
import SimpleLineIcons from '../views/icons/SimpleLineIcons'

// Views - Notifications
import Alerts from '../views/notifications/Alerts'
import Badges from '../views/notifications/Badges'
import Modals from '../views/notifications/Modals'

// Views - Pages
import Page404 from '../views/pages/Page404'
import Page500 from '../views/pages/Page500'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      meta: {auth: true},
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {auth: true},
        },
        {
          path: 'images/upload',
          name: 'Images',
          component: Images,
          meta: {auth: true},
        },

        {
          path: 'settings',
          redirect: '/settings/languages',
          name: 'Site administration',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {auth: true},
          children: [
            {
              path: 'languages',
              name: 'Languages',
              component: Languages,
              meta: {auth: true},
            },
            {
              path: 'Authors',
              name: 'Authors',
              component: Authors,
              meta: {auth: true},
            },
            {
              path: 'Categories',
              name: 'Categories',
              component: Categories,
              meta: {auth: true},
            },
            {
              path: 'Collections',
              name: 'Collections',
              component: Collections,
              meta: {auth: true},
            },
          ]
        },

        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {auth: true},
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors,
              meta: {auth: true},
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography,
              meta: {auth: true},
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts,
          meta: {auth: true},
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets,
          meta: {auth: true},
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {auth: true},
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards,
              meta: {auth: true}
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms,
              meta: {auth: true}
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches,
              meta: {auth: true}
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables,
              meta: {auth: true}
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs,
              meta: {auth: true}
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels,
              meta: {auth: true}
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses,
              meta: {auth: true}
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons,
              meta: {auth: true}
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups,
              meta: {auth: true}
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs,
              meta: {auth: true}
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars,
              meta: {auth: true}
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations,
              meta: {auth: true}
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers,
              meta: {auth: true}
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars,
              meta: {auth: true}
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips,
              meta: {auth: true}
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/buttons',
          name: 'Buttons',
          meta: {auth: true},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons,
              meta: {auth: true}
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups,
              meta: {auth: true}
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns,
              meta: {auth: true}
            },
            {
              path: 'social-buttons',
              name: 'Social Buttons',
              component: SocialButtons,
              meta: {auth: true}
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          meta: {auth: true},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'flags',
              name: 'Flags',
              component: Flags,
              meta: {auth: true}
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome,
              meta: {auth: true}
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons,
              meta: {auth: true}
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          meta: {auth: true},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts,
              meta: {auth: true}
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges,
              meta: {auth: true}
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals,
              meta: {auth: true}
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
