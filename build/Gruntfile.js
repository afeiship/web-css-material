(function () {

    var path = require('path'),
        grunt = require('grunt');

    var pwd = process.cwd(),
        rootPath = path.dirname(pwd);

    grunt.initConfig({
        fontsDir: rootPath + '/src/less/fonts',
        fontsDestDir: rootPath + '/dest/fonts',
        jsDestDir: rootPath + '/dest/js',
        lessDir: rootPath + '/src/less',
        cssDir: rootPath + '/dest/css',
        clean: {
            base: {
                src: [
                    rootPath + '/dest',
                    rootPath + '/src/css'
                ]
            }
        },
        less: {
            options: {
//                compress:true
            },
            base: {
                src: '<%=lessDir%>/style.less',
                dest: '<%=cssDir%>/style.css'
            }
        },
        cssmin: {
            options: {
//                compatibility: 'ie8' //设置兼容模式
//                noAdvanced: true //取消高级特性
            },
            minify: {
                expand: true,
                cwd: '<%=cssDir%>/',
                src: ['*.css', '!*.min.css'],
                dest: '<%=cssDir%>/',
                ext: '.min.css'
            }
        },
        pure_grids: {
            responsive: {
                dest: rootPath + '/src/less/grid/dib-grid.less',
                options: {
                    units: [5, 12], // 12-column grid
                    mediaQueries: {
                        sm: 'screen and (min-width: 35.5em)', // 568px
                        md: 'screen and (min-width: 48em)',   // 768px
                        lg: 'screen and (min-width: 64em)',   // 1024px
                        xl: 'screen and (min-width: 80em)'    // 1280px
                    },
                    selectorPrefix: '.dib-u-'
                }
            }
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        force: true,
                        cwd: '<%=fontsDir%>/',
                        src: ['**'],
                        dest: '<%=fontsDestDir%>/'
                    }
                ]
            }
        }
    });

    //load necessary modules:
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-pure-grids');

    //register task for project:
    grunt.registerTask('default', [
        'clean',
        'less',
        'cssmin',
        //'pure_grids',
        'copy'
    ]);

}());