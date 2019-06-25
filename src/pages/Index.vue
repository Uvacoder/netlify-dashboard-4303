<template>
  <Layout>
    <h1>Leininger Dashboard</h1>

    <div class="report-card">
      <div v-for="site in sites" :key="site.id" class="card">
        <header class="flex justify-between items-center">
          <a :href="site.url" class="title">
            <h3>{{ site.name }}</h3>
          </a>
          <a :href="site.repo" class="repo"><github /></a>
        </header>
        <a :href="`${site.adminUrl}/deploys`" class="badge">
          <img :src="site.badgeUrl" />
        </a>
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
import github from '@/components/github.vue'

export default {
  name: 'Dashboard',
  components: {
    github,
  },
  metaInfo: {
    title: 'Status Report',
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
  },
}
</script>

<style>
.report-card {
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  padding-bottom: 2rem;
}
@media screen and (min-width: 700px) {
  .report-card {
    grid-template-columns: 1fr 1fr;
  }
}
.card {
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s;
}
.card:hover {
  box-shadow: 0 1rem 1.5rem 0 rgba(26, 35, 63, 0.1),
    0 0.25rem 0.5rem 0 rgba(27, 43, 52, 0.06);
}
header {
  margin-bottom: 1rem;
}
h3 {
  margin: 0;
}
.title {
  color: var(--black);
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}
.title:hover {
  color: var(--teal);
}
.repo {
  color: var(--grey-dark);
  transition: color 0.2s;
}
.repo:hover {
  color: var(--black);
}
.repo,
.repo svg {
  height: 1.5rem;
  width: 1.5rem;
}
</style>
