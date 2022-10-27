<template>
  <Layout>
    <header>
      <div class="site-title">
        <h1 @click="countIt">
          Status is what? Status is who? Chika-chika DASHBOARD
        </h1>
        <button v-if="clicker >= 10 && !canDeploy" @click="grantAccess" class="login-btn">
          Login
        </button>
      </div>
      <p class="description">{{ count }} Websites</p>
    </header>
    <div class="card-grid">
      <article
        v-for="site in sites"
        :key="site.id"
        class="card"
      >
        <header>
          <a
            :href="site.url"
            class="title"
          >
            <p>{{ site.name }}</p>
          </a>
          <a
            :href="site.repo"
            :title="`${site.name} github`"
            class="provider-link"
          >
            <github />
          </a>
        </header>
        <footer>
          <a :href="`${site.adminUrl}/deploys`" class="badge">
            <img
              :src="site.badgeUrl"
              :alt="`${site.name} deploy status.`"
              class="block"
            />
          </a>
          <div v-if="canDeploy">
            <button
              v-if="!deployed.includes(site.id)"
              @click="triggerDeploy(site.id)"
            >
              Deploy
            </button>
            <p v-else class="success">Deployed!</p>
          </div>
        </footer>
      </article>
    </div>
  </Layout>
</template>

<page-query>
  query Sites {
    sites: allSites(sortBy: "name", order: ASC) {
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
  methods: {
    triggerDeploy(site_id) {
      axios.post(`/api/trigger`, {site_id})
      this.deployed.push(site_id)
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
.site-title {
  align-items: center;
  display: flex;
  user-select: none;
}
.login-btn {
  margin-left: 1rem;
}
.description {
  color: #00999B;
  @media (prefers-color-scheme: dark) {
    color: #5fb3b3;
  }
}
.card-grid {
  display: grid;
  gap: 1.5rem;
  padding: 3rem 0;
  @media screen and (min-width: 700px) {
    grid-template-columns:  1fr 1fr;
  }
}
.card {
  background: #fff;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  @media (prefers-color-scheme: dark) {
    background: #1b2b34;
    color: #f4f6f9;
    &:hover {
      border-color: #5fb3b3;
    }
  }
  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  footer {
    align-items: flex-end;
    display: flex;
    height: 2rem;
    justify-content: space-between;
  }
}
.title {
  color: #0f1c23;
  font-size: 1.125rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #00999B;
  }
  @media (prefers-color-scheme: dark) {
    color: #f4f6f9;
    &:hover {
      color: #5fb3b3;
    }
  }
}
.provider-link {
  color: #65737e;
  height: 1.5rem;
  transition: color 0.2s ease-in-out;
  width: 1.5rem;
  &:hover {
    color: #0f1c23;
  }
  @media (prefers-color-scheme: dark) {
    color: #c2c7d0;
    &:hover {
      color: #f4f6f9;
    }
  }
}
button {
  background: #00999B;
  border: none;
  border-radius: 0.25rem;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 4px 8px;
  transition: all 0.3s;
  &:hover {
    background: #65737e;
  }
}
.success {
  font-size: 0.75rem;
  color: #65737e;
  padding: 4px 0px 4px 8px;
}
</style>
