// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
require('dotenv').config()
const NetlifyAPI = require('netlify')
const netlify = new NetlifyAPI(process.env.NETLIFY_ACCESS_KEY)

module.exports = function(api) {
  api.loadSource(async ({ addContentType }) => {
    const sites = await netlify.listSites()
    const contentType = addContentType({
      typeName: 'Sites',
    })

    for (const site of sites) {
      contentType.addNode({
        id: site.id,
        fields: {
          name: site.name,
          url: site.url,
          adminUrl: site.admin_url,
          screenshot: site.screenshot_url,
          repo: site.build_settings.repo_url,
          provider: site.build_settings.provider,
        },
      })
    }
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}
