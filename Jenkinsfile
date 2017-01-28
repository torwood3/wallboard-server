node {
    stage "Prepare environment"
        checkout scm
        def environment  = docker.build 'cloudbees-node'

        environment.inside {
            stage "Checkout and build deps"
                sh "npm install"

            stage "Validate types"
                sh "./node_modules/.bin/flow"

            stage "Test and validate"
                sh "npm install gulp-cli && ./node_modules/.bin/gulp"
                junit 'reports/**/*.xml'
        }

    stage "Cleanup"
        deleteDir()
}