import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Mixpanel script to inject
const mixpanelScript = `<script type="text/javascript">
    (function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split( " "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for ( var d = {}, e = ["get_group"].concat( Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);
    
    // OpenGeometry Demos
    mixpanel.init("208dc00903cea2acd37fa5ab8113cbd9", {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  </script>`;

// Plugin to inject Mixpanel script into HTML files
function injectMixpanelScript() {
  return {
    name: 'inject-mixpanel-script',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        // Find the closing </head> tag and inject the script before it
        return html.replace('</head>', `  ${mixpanelScript}\n</head>`);
      }
    }
  };
}

// Recursively collect all .html files in 'src'
function findHtmlFiles(dir, entries = {}) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, entries);
    } else if (file.endsWith('.html')) {
      const name = fullPath
        .replace(__dirname + '/', '')     // relative path from root
        .replace(/\.html$/, '');          // remove extension
      entries[name] = fullPath;
    }
  }
  return entries;
}

const input = findHtmlFiles(resolve(__dirname, 'src'));

// Add the root index.html file to the input
input['index'] = resolve(__dirname, 'index.html');

export default defineConfig({
  base: './',
  plugins: [injectMixpanelScript()],
  server: {
    port: 5551,
  },
  build: {
    rollupOptions: {
      input
    },
  },
});
