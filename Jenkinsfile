pipeline {
    agent any

    environment {
        IMAGE_NAME = "codexa-site"
        CONTAINER_NAME = "codexa-container"
        HOST_PORT = "8082"
        CONTAINER_PORT = "80"
        REPO_URL = "https://github.com/ParthaV30/CodeXa-site.git"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "--- Building Docker image for rturox.com ---"
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Cleanup Old Container') {
            steps {
                script {
                    echo "--- Cleaning up old container (if exists) ---"
                    sh """
                        if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                            echo "Stopping and removing existing container..."
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                        fi
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    echo "--- Running new container for rturox.com ---"
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Clean Dangling Images') {
            steps {
                script {
                    sh "docker image prune -f || true"
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    echo "--- Checking if site is live on port ${HOST_PORT} ---"
                    sh """
                        sleep 5
                        if curl -s http://localhost:${HOST_PORT} | grep -q '<html>'; then
                            echo 'Health check passed ✅'
                        else
                            echo 'Health check failed ❌'
                            exit 1
                        fi
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Visit: http://rturox.com"
        }
        failure {
            echo "❌ Deployment failed. Check Jenkins logs for details."
        }
    }
}
