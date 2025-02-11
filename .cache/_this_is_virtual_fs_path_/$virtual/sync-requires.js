
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/pages/404.js")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/pages/index.tsx")),
  "component---src-pages-login-tsx": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/pages/login.tsx")),
  "component---src-pages-page-2-js": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/pages/page-2.js")),
  "component---src-pages-using-ssr-js": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/pages/using-ssr.js")),
  "component---src-pages-using-typescript-tsx": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/pages/using-typescript.tsx")),
  "component---src-templates-using-dsg-js": preferDefault(require("/Users/loskilltrosblues/Desktop/PROYECTOS/my-payments/src/templates/using-dsg.js"))
}

