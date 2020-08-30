<template>
  <Layout>
    <div class="flex items-center">
      <h1
        @click="countIt"
        class="text-3xl font-bold select-none m-0 cursor-default"
      >
        Leininger Dashboard
      </h1>
      <button
        v-if="clicker >= 10 && !canDeploy"
        @click="grantAccess"
        class="ml-4 px-4 leading-5"
      >
        Login
      </button>
    </div>
    <p class="text-teal-dark dark:text-teal">{{ count }} Websites</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-12">
      <div
        v-for="site in sites"
        :key="site.id"
        class="bg-white dark:bg-grey-darker rounded-md p-4 transition-all ease-out duration-300 hover:shadow-xl dark:hover:border-teal border-transparent border"
      >
        <header class="flex justify-between items-center mb-2">
          <a
            :href="site.url"
            class="text-black dark:text-grey-light no-underline uppercase duration-200 transition-colors dark:hover:text-teal hover:text-teal-dark"
          >
            <h3 class="font-bold text-lg m-0">{{ site.name }}</h3>
          </a>
          <a
            :href="site.repo"
            :title="`${site.name} github`"
            class="text-grey-dark hover:text-black dark:hover:text-grey-light duration-200 transition-colors"
          >
            <github class="h-6 w-6" />
          </a>
        </header>
        <footer class="flex justify-between items-end h-8">
          <a :href="`${site.adminUrl}/deploys`" class="badge">
            <img
              :src="site.badgeUrl"
              :alt="`${site.name} deploy status.`"
              class="block"
            />
          </a>
          <div v-if="canDeploy">
            <button
              v-if="!deployed.includes(site.name)"
              @click="triggerDeploy(site.name)"
            >
              Deploy
            </button>
            <p v-else class="text-sm text-grey-dark">Deployed!</p>
          </div>
        </footer>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query Sites {
    sites: allSites {
      edges {
        node {
          id
          name
          url
          adminUrl
          repo
          provider
        }
      }
    }
  }
</page-query>

<script>
import axios from 'axios'
import github from '@/components/github.vue'

export default {
  name: 'Dashboard',
  components: {
    github,
  },
  metaInfo: {
    title: 'Dashboard',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'This is a dashboard of the current state of sites I host on Netlify.',
      },
    ],
  },
  data() {
    return {
      clicker: 0,
      canDeploy: false,
      deployed: [],
    }
  },
  computed: {
    sites() {
      return this.$page.sites.edges.map(it => {
        return {
          id: it.node.id,
          name: it.node.name,
          url: it.node.url,
          adminUrl: it.node.adminUrl,
          repo: it.node.repo,
          screenshot: it.node.screenshot,
          provider: it.node.provider,
          badgeUrl: `https://api.netlify.com/api/v1/badges/${it.node.id}/deploy-status`,
        }
      })
    },
    count() {
      return this.sites.length
    },
  },
  mounted() {
    console.log('hello')
  },
  methods: {
    triggerDeploy(site) {
      if (site === 'raleininger') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72ce06c82dfba3684e9dcf'
        )
      } else if (site === 'rad-addresses') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72cd90c33b02a5d7deb8ee'
        )
      } else if (site === 'leininger-dashboard') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72cd6e4e71d0bd7f2dee6d'
        )
      } else if (site === 'rad-gifts') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72cd41d6e05e9851e7ca08'
        )
      } else if (site === 'leinin') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72cdece51595ae3f4a452b'
        )
      } else if (site === 'cms-gridsome-demo') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72cdb23586e69341236dd4'
        )
      } else if (site === 'doinginterneting') {
        axios.post(
          'https://api.netlify.com/build_hooks/5d72cd074e71d08c332dee8d'
        )
      } else if (site === 'fauna-db') {
        axios.post(
          'https://api.netlify.com/build_hooks/5e68d0fa47b204860bf5e90e'
        )
      } else if (site === 'wp-starter') {
        axios.post(
          'https://api.netlify.com/build_hooks/5e68d16d3a3ec967abca6ce4'
        )
      } else if (site === 'dev-links') {
        axios.post(
          'https://api.netlify.com/build_hooks/5f4c098a281ab685e15f5e54'
        )
      }
      this.deployed.push(site)
    },
    grantAccess() {
      this.canDeploy = true
    },
    countIt() {
      this.clicker++
    },
  },
}
</script>

<style lang="scss">
button {
  background: theme('colors.teal-dark');
  border: none;
  color: theme('colors.white');
  font-size: 0.75rem;
  padding: 4px 8px;
  transition: all 0.3s;
  &:hover {
    background: theme('colors.grey-darker');
  }
}
</style>
