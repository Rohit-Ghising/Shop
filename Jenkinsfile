pipeline {
  agent any

  environment {
    // Optional: load env file if needed
    COMPOSE_PROJECT_NAME = 'shop_project'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/Rohit-Ghising/Shop.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }

  post {
    success {
      echo 'Deployment successful!'
    }
    failure {
      echo 'Deployment failed!'
    }
  }
}
