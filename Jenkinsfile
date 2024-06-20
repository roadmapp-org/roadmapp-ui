pipeline {
    agent any
    environment {
        GITHUB_ORG = 'roadmapp-org'
        CONTAINER_REGISTRY = "ghcr.io/${GITHUB_ORG}/"
    }

    stages {
        stage('Build Application') {
            agent{
                docker {
                    image 'node:16-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'echo Performing npm install'
                sh 'sudo chown -R 129:138 "/.npm"'
                sh 'sudo npm install'
            }
        }
    }
}
