pipeline {
    agent any
    environment {
        GITHUB_ORG = 'roadmapp-org'
        CONTAINER_REGISTRY = "ghcr.io/${GITHUB_ORG}/"
        CONTAINER_REGISTRY_URL = "https://${env.CONTAINER_REGISTRY}"
        APP_NAME = 'react-app'
        VERSION = 'latest'  
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the multi-stage Dockerfile
                    def image = docker.build("${CONTAINER_REGISTRY}${APP_NAME}:${VERSION}")
                    
                    // Push the Docker image to the registry
                    docker.withRegistry("${CONTAINER_REGISTRY_URL}", 'github-pat') {
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
