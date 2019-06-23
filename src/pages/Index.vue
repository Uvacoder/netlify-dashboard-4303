<template>
  <Layout>
    <h1>Leininger Dashboard</h1>

    <div v-for="site in sites">
      <header class="flex justify-between">
        <a :href="site.url"><h3>{{ site.name }}</h3></a>
        <a :href="site.repo">{{ site.provider }}</a>
      </header>
      <a :href="`${site.adminUrl}/deploys`">
        <img :src="`https://api.netlify.com/api/v1/badges/${site.id}/deploy-status`" />
      </a>
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
export default {
  name: "Dashboard",
  metaInfo: {
    title: 'Status Report'
  },
  computed: {
    sites () {
      return this.$page.sites.edges.map(it => {
        return {
          id: it.node.id,
          name: it.node.name,
          url: it.node.url,
          adminUrl: it.node.adminUrl,
          repo: it.node.repo,
          screenshot: it.node.screenshot,
          provider: it.node.provider,
        }
      }).sort((a, b) => a.hash > b.hash ? 1 : -1)
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
