import Login from './components/login/Login.vue'
import Header from './components/common/Header.vue'
import Body from './components/main/Body.vue'
import InfoSummary from './components/main/InfoSummary.vue'
import Statistic from './components/main/Statistic.vue'


export const routes = [
  { path: '/', component: Login },
  { path: '/home',
    components: {
      nestedHeader: Header,
      default: Body,
      summaryView: InfoSummary
    }
  },
  { path: '/logs',
    components: {
      nestedHeader: Header,
      default: Statistic
    },
    props: (route) => ({ query: route.query.address })
  }
];
