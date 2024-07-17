const modules = [
    "/node_modules/admin-lte/plugins/jquery/jquery.min.js",
    "/node_modules/bootstrap/dist/js/bootstrap.js",
    "/node_modules/bootstrap/dist/js/bootstrap.min.js",
    "/node_modules/bootstrap/dist/js/bootstrap.bundle.js",
    "/node_modules/admin-lte/plugins/jquery-ui/jquery-ui.min.js",
    "/node_modules/admin-lte/plugins/chart.js/Chart.min.js",
    "/node_modules/admin-lte/plugins/sparklines/sparkline.js",
    "/node_modules/admin-lte/plugins/jqvmap/jquery.vmap.min.js",
    "/node_modules/admin-lte/plugins/jqvmap/maps/jquery.vmap.usa.js",
    "/node_modules/admin-lte/plugins/jquery-knob/jquery.knob.min.js",
    "/node_modules/admin-lte/plugins/moment/moment.min.js",
    "/node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js",
    "/node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
    "/node_modules/admin-lte/dist/js/adminlte.min.js",
]


modules.forEach(m => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = m;
        document.head.appendChild(script);
    }
)