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
            steps {
                sh 'echo Performing npm install'
                // Change ownership of the .npm directory before npm install
                sh 'chown -R $(id -u):$(id -g) /root/.npm || true'
                // Install npm packages
                sh 'npm install'
            }
        }
    }

}
