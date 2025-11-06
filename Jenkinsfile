pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "heisenbergzz/codexa-site:${env.BUILD_NUMBER}"
    DOCKER_LATEST = "heisenbergzz/codexa-site:latest"
    EC2_HOST = "ubuntu@107.20.108.153"
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'master', url: 'https://github.com/ParthaV30/CodeXa-site.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build(DOCKER_IMAGE)
        }
      }
    }

    stage('Push Docker Image to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-cred', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh '''
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push ${DOCKER_IMAGE}
            docker tag ${DOCKER_IMAGE} ${DOCKER_LATEST}
            docker push ${DOCKER_LATEST}
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-ssh-cred']) {
          sh '''
            ssh -o StrictHostKeyChecking=no $EC2_HOST "
              echo '--- Pulling latest CodeXa image ---' &&
              docker pull ${DOCKER_LATEST} &&
              echo '--- Stopping old container (if any) ---' &&
              docker stop codexa-site || true &&
              docker rm codexa-site || true &&
              echo '--- Starting new container ---' &&
              docker run -d --name codexa-site -p 8082:80 ${DOCKER_LATEST} &&
              echo '--- Deployment complete for rturox.com ---'
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
      echo "❌ Deployment failed. Check Jenkins console output for details."
    }
  }
}
