module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');

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
                    mocha: require('mocha'),
                    reporter: 'spec'
                },
                src: ['tests/**/*.js'],
                timeout : 10000
            }
        }
    });

    grunt.registerTask('default',['jshint','mochaTest']);
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['mochaTest']);
};
