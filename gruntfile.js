module.exports = function(grunt){

   require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            files: [
                'src/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                force: true
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false, 
                    clearRequireCache: false
                },
                src: ['tests/**/*.js']
            }
        }
    });

    grunt.registerTask('default',['check','test']);
    grunt.registerTask('check',  ['jshint']);
    grunt.registerTask('test',   ['mochaTest']);
};
