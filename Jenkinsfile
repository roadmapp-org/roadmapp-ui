pipeline {
    agent any
    environment {
        GITHUB_ORG = 'roadmapp-org'
        CONTAINER_REGISTRY = "ghcr.io/${GITHUB_ORG}/"
        APP_NAME = 'react-app'
        VERSION = 'latest'  // You can set this dynamically or use a specific version
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the multi-stage Dockerfile
                    def image = docker.build("${CONTAINER_REGISTRY}${APP_NAME}:${VERSION}")
                    
                    // Push the Docker image to the registry
                    docker.withRegistry('https://ghcr.io', 'github-pat') {
                        image.push()
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                // Clean up any temporary files if necessary
                sh 'rm -rf node_modules'
                sh 'rm -rf build'
            }
        }
    }
}
