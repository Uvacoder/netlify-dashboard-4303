<template>
  <Layout>
    <h1>Leininger Dashboard</h1>

    <div class="report-card">
      <div v-for="site in sites" class="card">
        <header class="flex justify-between">
          <a :href="site.url"><h3>{{ site.name }}</h3></a>
          <a :href="site.repo">{{ site.provider }}</a>
        </header>
        <a :href="`${site.adminUrl}/deploys`">
          <img :src="`https://api.netlify.com/api/v1/badges/${site.id}/deploy-status`" />
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
      })
    }
  }
}
</script>

<style>
.report-card {
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
}
.card {
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: transform 0.2s;
}
.card:hover{
  box-shadow: 0 1rem 1.5rem 0 rgba(26, 35, 63, 0.1),
      0 0.25rem 0.5rem 0 rgba(27, 43, 52, 0.06);
  transform: scale(1.02);
}
h3 {
  margin-top: 0;
}
</style>
