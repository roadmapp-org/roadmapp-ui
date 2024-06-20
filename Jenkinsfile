pipeline {
    agent any
    environment {
        GITHUB_ORG = 'roadmapp-org'
        CONTAINER_REGISTRY = "ghcr.io/${GITHUB_ORG}/"
    }

    stages {
        stage('Build Application') {
            agent {
                docker {
                    image 'node:16-alpine'
                    reuseNode true
                }
            }
            environment {
                NPM_CONFIG_CACHE = "${env.WORKSPACE}/.npm"
            }
            steps {
                sh 'echo Performing npm install'
                sh 'mkdir -p ${NPM_CONFIG_CACHE} && chown -R $(id -u):$(id -g) ${NPM_CONFIG_CACHE}'
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }

}
