pipeline {
  agent any

  environment {
    IMAGE_NAME = "heisenbergzz/codexa-site"
    EC2_HOST = "ubuntu@107.20.108.153"
  }

  stages {
    stage('Checkout Code') {
      steps {
        // Clone your CodeXa-site repo
        git branch: 'master', url: 'https://github.com/ParthaV30/CodeXa-site.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        dir('CodeXa-site') {
          sh '''
            echo "--- Building Docker image for rturox.com ---"
            docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
            docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
          '''
        }
      }
    }

    stage('Push Docker Image to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-cred', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh '''
            echo "--- Logging into Docker Hub ---"
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            echo "--- Pushing Docker images ---"
            docker push ${IMAGE_NAME}:${BUILD_NUMBER}
            docker push ${IMAGE_NAME}:latest
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-ssh-cred']) {
          sh '''
            echo "--- Deploying to EC2 107.20.108.153 ---"
            ssh -o StrictHostKeyChecking=no $EC2_HOST "
              docker pull ${IMAGE_NAME}:latest &&
              docker stop codexa-site || true &&
              docker rm codexa-site || true &&
              docker run -d --name codexa-site -p 8082:80 ${IMAGE_NAME}:latest &&
              echo '--- Deployment complete ---'
            "
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment successful! Visit https://rturox.com"
    }
    failure {
      echo "❌ Deployment failed. Check Jenkins logs for details."
    }
  }
}