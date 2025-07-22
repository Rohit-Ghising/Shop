pipeline {
  agent any

  stages {
    stage('Clone') {
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
        sh 'docker-compose down && docker-compose up -d'
      }
    }
  }
}
